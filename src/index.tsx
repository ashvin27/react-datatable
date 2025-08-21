/**
 * This is the React Component for ReactDatatable
 *
 * @package        ReactDatatable
 * @author         Ashvin Patel(patelash212@gmail.com)
 * @date           14 Dec, 2018
 */

import React, { useState, useRef } from 'react';
import _ from 'lodash';
import TableHeader from './components/TableHeader';
import TableFooter from './components/TableFooter';

// Type definitions for props and state
export interface Column {
  key: string;
  text: string;
  sortable?: boolean;
  width?: string | number;
  align?: string;
  cell?: (record: any, index: number) => React.ReactNode;
  className?: string;
  TrOnlyClassName?: string;
}

export interface Language {
  length_menu?: string;
  filter?: string;
  info?: string;
  pagination?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
  no_data_text?: string;
  loading_text?: string;
}

export interface ButtonConfig {
  excel?: boolean;
  print?: boolean;
  csv?: boolean;
  extra?: boolean;
}

export interface TableConfig {
  button?: ButtonConfig;
  filename?: string;
  key_column?: string;
  language?: Language;
  length_menu?: number[];
  show_length_menu?: boolean;
  show_filter?: boolean;
  show_pagination?: boolean;
  show_info?: boolean;
  show_first?: boolean;
  show_last?: boolean;
  pagination?: string;
  page_size?: number;
  sort?: {
    column: string;
    order: string;
  } | false;
}

export interface ReactDatatableProps {
  id?: string;
  className?: string;
  columns: Column[];
  config?: TableConfig;
  dynamic?: boolean;
  records: any[];
  total_record?: number;
  loading?: boolean;
  tHeadClassName?: string;
  extraButtons?: React.ReactNode;
  onChange?: (tableData: any) => void;
  onPageChange?: (pageState: any) => void;
  onRowClicked?: (e: React.MouseEvent, record: any, rowIndex: number) => void;
  onSort?: (column: string, records: any[], order: string) => any[];
}

export interface ReactDatatableState {
  is_temp_page: boolean;
  filter_value: string;
  page_size: number;
  page_number: number;
  sort: { column: string; order: string } | false;
  temp_page_number?: number;
}

const defaultConfig: TableConfig = {
  button: { excel: false, print: false, csv: false },
  filename: 'table',
  key_column: 'id',
  language: {
    length_menu: 'Show _MENU_ records per page',
    filter: 'Search in records...',
    info: 'Showing _START_ to _END_ of _TOTAL_ entries',
    pagination: { first: 'First', previous: 'Previous', next: 'Next', last: 'Last' },
    no_data_text: 'No rows found',
    loading_text: 'Loading...'
  },
  length_menu: [10, 25, 50, 75, 100],
  show_length_menu: true,
  show_filter: true,
  show_pagination: true,
  show_info: true,
  show_first: true,
  show_last: true,
  pagination: 'basic',
  page_size: 10,
  sort: { column: 'test', order: 'asc' }
};

const ReactDatatable = (props: ReactDatatableProps) => {
  // Default props
  const {
    id = "as-react-datatable",
    className = "table table-bordered table-striped",
    columns = [],
    config: userConfig = {},
    dynamic = false,
    records = [],
    total_record = 0,
    loading = false,
    tHeadClassName = '',
    extraButtons,
    onChange = () => {},
    onPageChange = () => {},
    onRowClicked = () => {},
    onSort,
  } = props;

  // Merge config
  const config = { ...defaultConfig, ...userConfig };

  // State hooks
  const [filterValue, setFilterValue] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(config.page_size || 10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sort, setSort] = useState<{ column: string; order: string } | false>(config.sort || false);
  const [isTempPage, setIsTempPage] = useState<boolean>(false);
  const [tempPageNumber, setTempPageNumber] = useState<number | undefined>(undefined);
  const exportExcelRef = useRef<HTMLAnchorElement>(null);

  // Utility functions
  const numPages = (totalRecord: number) => Math.ceil(totalRecord / pageSize);
  const isFirst = () => pageNumber === 1;
  const isLast = (pages: number) => pages === 0 || pageNumber === pages;

  const paginate = (records: any[]) => {
    const start = (pageNumber - 1) * pageSize;
    return records.slice(start, start + pageSize);
  };

  const filterRecords = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumber(1);
    setFilterValue(e.target.value);
    handleChange();
  };

  const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    handleChange();
  };

  const sortColumn = (event: React.MouseEvent, column: Column, sortOrder: string) => {
    if (!column.sortable) return;
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSort({ column: column.key, order: newSortOrder });
    handleChange();
  };

  const goToPage = (e: React.MouseEvent, newPageNumber: number) => {
    e.preventDefault();
    if (pageNumber === newPageNumber) return;
    onPageChange({ previous_page: pageNumber, current_page: newPageNumber });
    setIsTempPage(false);
    setPageNumber(newPageNumber);
    handleChange();
  };

  const firstPage = (e: React.MouseEvent, pages: number) => {
    e.preventDefault();
    if (isFirst()) return;
    goToPage(e, 1);
  };

  const lastPage = (e: React.MouseEvent, pages: number) => {
    e.preventDefault();
    if (isLast(pages)) return;
    goToPage(e, pages);
  };

  const previousPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFirst()) return;
    goToPage(e, pageNumber - 1);
  };

  const nextPage = (e: React.MouseEvent, pages: number) => {
    e.preventDefault();
    if (isLast(pages)) return;
    goToPage(e, pageNumber + 1);
  };

  const handlePageChange = (e: any, isInputChange = false) => {
    if (isInputChange) {
      setIsTempPage(true);
      setTempPageNumber(Number(e.target.value));
    } else if (e.key === 'Enter') {
      goToPage(e, Number(e.target.value));
    }
  };

  const handlePageBlur = (e: any) => {
    goToPage(e, Number(e.target.value));
  };

  const strip = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Export helpers
  const getExportHtml = () => {
    let tableHtml = "<table><thead><tr>";
    columns.forEach(col => {
      tableHtml += `<th>${col.text}</th>`;
    });
    tableHtml += "</tr></thead><tbody>";
    let filterRecordsArr = records;
    if (!dynamic) {
      let sorted = sortRecords();
      filterRecordsArr = sorted;
      if (filterValue) filterRecordsArr = filterData(sorted);
    }
    filterRecordsArr.forEach((record, i) => {
      tableHtml += "<tr>";
      columns.forEach(col => {
        if (col.cell && typeof col.cell === "function") {
          let cellData = strip(String(col.cell(record, i)));
          tableHtml += `<td>${cellData}</td>`;
        } else if (record[col.key]) {
          tableHtml += `<td>${record[col.key]}</td>`;
        } else {
          tableHtml += `<td></td>`;
        }
      });
      tableHtml += "</tr>";
    });
    tableHtml += "</tbody></table>";
    return tableHtml;
  };

  const exportToExcel = () => {
    const dataType = 'application/vnd.ms-excel';
    const tableHtml = getExportHtml();
    const filename = config.filename ? config.filename + '.xls' : 'table.xls';
    const downloadLink = document.createElement("a");
    if ((window.navigator as any).msSaveOrOpenBlob) {
      const blob = new Blob(['\ufeff', tableHtml], { type: dataType });
      (window.navigator as any).msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = 'data:' + dataType + ';base64,' + btoa(tableHtml);
      downloadLink.download = filename;
      downloadLink.click();
    }
  };

  const exportToPDF = () => {
    const tableHtml = getExportHtml();
    let styleStr = `<style>table {width: 100%;font: 17px Calibri;}table, th, td {border: solid 1px #DDD; border-collapse: collapse;padding: 2px 3px;text-align:left;}</style>`;
    const win = window.open('', '_blank');
    win.document.write('<html><head>');
    win.document.write('<title>' + config.filename + '</title>');
    win.document.write(styleStr);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<h1>' + config.filename + '</h1>');
    win.document.write(tableHtml);
    win.document.write('</body></html>');
    win.print();
    win.close();
  };

  const convertToCSV = (objArray: any) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    array.forEach((row: any) => {
      let line = '';
      Object.keys(row).forEach((key, idx) => {
        if (idx > 0) line += ',';
        line += row[key];
      });
      str += line + '\r\n';
    });
    return str;
  };

  const exportToCSV = () => {
    const headers: any = {};
    columns.forEach(col => {
      headers[col.key] = '"' + col.text + '"';
    });
    let filterRecordsArr = records;
    if (!dynamic) {
      let sorted = sortRecords();
      filterRecordsArr = sorted;
      if (filterValue) filterRecordsArr = filterData(sorted);
    }
    const dataRows = filterRecordsArr.map((record, i) => {
      const newRecord: any = {};
      columns.forEach(col => {
        if (col.cell && typeof col.cell === "function") {
          let cellData = strip(String(col.cell(record, i)));
          newRecord[col.key] = cellData;
        } else if (record[col.key]) {
          let colValue = record[col.key];
          colValue = typeof colValue === "string" ? colValue.replace(/"/g, '""') : colValue;
          newRecord[col.key] = '"' + colValue + '"';
        } else {
          newRecord[col.key] = "";
        }
      });
      return newRecord;
    });
    const allRows = [headers, ...dataRows];
    const csv = convertToCSV(JSON.stringify(allRows));
    const exportedFilename = config.filename + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if ((window.navigator as any).msSaveBlob) {
      (window.navigator as any).msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement("a");
      if ('download' in link) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }
  };

  // Data filtering and sorting
  const filterData = (recordsArr: any[]) => {
    return recordsArr.filter((record) => {
      let allow = false;
      columns.forEach((column) => {
        if (record[column.key]) {
          allow = String(record[column.key]).toLowerCase().includes(filterValue.toLowerCase()) || allow;
        }
      });
      return allow;
    });
  };

  const sortRecords = () => {
    if (sort && sort.column) {
      return _.orderBy(records, o => {
        const colVal = o[sort.column];
        if (typeof colVal === "string") {
          return isNaN(Number(colVal)) ? colVal.toLowerCase() : Number(colVal);
        } else if (typeof colVal === "number") {
          return colVal;
        }
        return colVal;
      }, [sort.order]);
    }
    return records;
  };

  // Add handleChange function
  const handleChange = () => {
    const tableData = {
      filter_value: filterValue,
      page_number: pageNumber,
      page_size: pageSize,
      sort_order: sort
    };
    onChange(tableData);
  };

  // Main render logic
  let filterRecordsArr: any[], totalRecords: number, pages: number;
  if (!dynamic) {
    let sorted = onSort && sort && typeof sort !== 'boolean' && sort.column && sort.order
      ? onSort(sort.column, records, sort.order)
      : sortRecords();
    filterRecordsArr = sorted;
    if (filterValue) filterRecordsArr = filterData(sorted);
    totalRecords = Array.isArray(filterRecordsArr) ? filterRecordsArr.length : 0;
    pages = numPages(totalRecords);
    filterRecordsArr = Array.isArray(filterRecordsArr) ? paginate(filterRecordsArr) : [];
  } else {
    filterRecordsArr = records;
    totalRecords = total_record;
    pages = numPages(totalRecords);
  }

  const startRecords = (pageNumber * pageSize) - (pageSize - 1);
  let endRecords = pageSize * pageNumber;
  endRecords = endRecords > totalRecords ? totalRecords : endRecords;

  // Type guards for config.language
  const lengthMenuText = (config.language?.length_menu ?? 'Show _MENU_ records per page').split('_MENU_');
  let paginationInfo = (config.language?.info ?? 'Showing _START_ to _END_ of _TOTAL_ entries')
    .replace('_START_', String(pageNumber === 1 ? 1 : startRecords))
    .replace('_END_', String(endRecords))
    .replace('_TOTAL_', String(totalRecords));

  return (
    <div className="as-react-table" id={id ? id + "-container" : ""}>
      <TableHeader
        config={config}
        id={id}
        lengthMenuText={lengthMenuText}
        recordLength={dynamic ? total_record : records.length}
        filterRecords={filterRecords}
        changePageSize={changePageSize}
        exportToExcel={exportToExcel}
        exportToCSV={exportToCSV}
        exportToPDF={exportToPDF}
        extraButtons={extraButtons}
      />
  <div className="row table-body asrt-table-body" id={id ? id + "-table-body" : ""}>
        <div className="col-md-12">
          <table className={className} id={id}>
            <thead className={tHeadClassName ? tHeadClassName : ''}>
              <tr>
                {columns.map((column) => {
                  let classText = column.sortable ? "sortable " : "";
                  let align = column.align || "";
                  let sortOrder = "";
                  if (column.sortable && sort && sort.column === column.key) {
                    sortOrder = sort.order;
                    classText += sortOrder ? " " + sortOrder : "";
                  }
                  classText += " text-" + align;
                  if (column.TrOnlyClassName) classText += " " + column.TrOnlyClassName;
                  return (
                    <th
                      key={column.key || column.text}
                      className={classText}
                      
                      onClick={event => sortColumn(event, column, sortOrder)}
                    >
                      {column.text}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="asrt-td-loading" align="center">
                    <div className="asrt-loading-textwrap">
                      <span className="asrt-loading-text">
                        {config.language?.loading_text}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filterRecordsArr.length ? (
                <>
                  {filterRecordsArr.map((record, rowIndex) => {
                    rowIndex = records.indexOf(record);
                    return (
                      <tr key={record[config.key_column ?? 'id']} onClick={e => onRowClicked(e, record, rowIndex)}>
                        {columns.map((column, colIndex) => {
                          if (column.cell && typeof column.cell === "function") {
                            return (
                              <td className={column.className} key={column.key || column.text}>
                                {column.cell(record, rowIndex)}
                              </td>
                            );
                          } else if (record[column.key]) {
                            return (
                              <td className={column.className} key={column.key || column.text}>
                                {record[column.key]}
                              </td>
                            );
                          } else {
                            return <td className={column.className} key={column.key || column.text}></td>;
                          }
                        })}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan={columns.length} align="center">
                    {config.language?.no_data_text}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <TableFooter
        config={config}
        id={id}
        isFirst={isFirst()}
        isLast={isLast(pages)}
        paginationInfo={paginationInfo}
        pages={pages}
        page_number={pageNumber}
        is_temp_page={isTempPage}
        temp_page_number={tempPageNumber}
        firstPage={e => firstPage(e, pages)}
        lastPage={e => lastPage(e, pages)}
        previousPage={previousPage}
        nextPage={e => nextPage(e, pages)}
        goToPage={goToPage}
        onPageChange={handlePageChange}
        onPageBlur={handlePageBlur}
      />
    </div>
  );
};

export default ReactDatatable;
