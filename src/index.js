/**
 * This is the React Component for ReactDatatable
 *
 * @package        ReactDatatable
 * @author         Ashvin Patel(patelash212@gmail.com)
 * @date           14 Dec, 2018
 */

import React, { Component, createContext, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import './assets/css/style.css';
import TableHeader from './components/TableHeader';
import TableFooter from './components/TableFooter';
import style from './style';
import { DEFAULT_CONFIG } from './constants';

export const ConfigContext = createContext(DEFAULT_CONFIG);

const ReactDatatable = ({id, className, cloumns, config, dynamic, records,total_record, onChange, onPageChange, onRowClicked,onSort}) => {
  const [initialConfig] = useState(config);

  const [initialState,setState] = useState({
    is_temp_page: false,
    filter_value: "",
    page_size: initialConfig.page_size ?? 10,
    page_number: 1,
    sort: initialConfig.sort ?? false
  })

  const componentOnChange = () => {
    delete initialState.is_temp_page;
    let tableData = initialState
    onChange(tableData);
  }

  const filterData = (records) => {
    let filterValue = initialState.filter_value;
    return records.filter((record) => {
      let allow = false;
      _.each(columns, (column) => {
        if (_.has(record(column.key))) {
          allow = _.includes(_.get(record, column.key).toString().toLowerCase(), filterValue.toString().toLowerCase()) ? true : allow;
        }
      });
      return allow;
    });
  }

  const sortRecords = () => {
    if(onSort) {
      return onSort(records, initialState.sort)
    }
    if(initialState.sort){
      return _.orderBy(records, o => {
        let colVal = o[initialState.sort.column];
        let typeofColVal = typeof colVal;
        if (typeofColVal == "string") {
          if (isNaN(colVal)) {
            return new String(colVal.toLowerCase());
          } else {
            return new Number(colVal);
          }
        } else if (typeofColVal == "number") {
          return new Number(colVal);
        }
      }, [initialState.sort.order]);
    } else {
      return records;
    }
  }

  const onStateChange = (newState) => {
    setState((prevState) => {
      return {
      ...prevState,
      ...newState
      }
    })
    componentOnChange()
  }

  const onFilterRecords = (e) => {
    let value = e.target.value;
    onStateChange({
      page_number: 1,
      filter_value: value
    })
  }

  const changePageSize = (e) => {
    let value = e.target.value;
    onStateChange({
      page_size: value
    })
  }

  const sortColumn = (event, column, sortOrder) => {
    if (!column.sortable) return false;
    let newSortOrder = (sortOrder == "asc") ? "desc" : "asc";
    onStateChange({
      'sort': { column: column.key, order: newSortOrder }
    })
  }

  const paginate = (records) => {
    let page_size = initialState.page_size;
    let page_number = initialState.page_number;
    --page_number; // because pages logically start with 1, but technically with 0
    return records.slice(page_number * page_size, (page_number + 1) * page_size);
  }

  const numPages = (totalRecord) => {
    return Math.ceil(totalRecord / initialState.page_size);
  }


  let filterRecords, totalRecords, pages, isFirst, isLast;
    if(!dynamic){
      let records = sortRecords(),
        filterValue = initialState.filter_value;
        filterRecords = records;

      if (filterValue) {
        filterRecords = filterData(records);
      }
      totalRecords = filterRecords.length ?? 0;
      pages = numPages(totalRecords);
      isFirst = isFirst(initialState.page_number);
      isLast = isLast(pages, initialState.page_number);
      filterRecords = paginate(filterRecords) ?? [];
    }else{
      filterRecords = records;
      totalRecords = total_record;
      pages = numPages(totalRecords);
      isFirst = isFirst(initialState.page_number);
      isLast = isLast(pages, initialState.page_number);
    }

    let startRecords = (initialState.page_number * initialState.page_size) - (initialState.page_size - 1);
    let endRecords = initialState.page_size * initialState.page_number;
    endRecords = (endRecords > totalRecords) ? totalRecords : endRecords;

    let lengthMenuText = initialConfig.language.length_menu;
    lengthMenuText = lengthMenuText.split('_MENU_');
    let paginationInfo = initialConfig.language.info;
    paginationInfo = paginationInfo.replace('_START_', (initialState.page_number === 1) ? 1 : startRecords);
    paginationInfo = paginationInfo.replace('_END_', endRecords);
    paginationInfo = paginationInfo.replace('_TOTAL_', totalRecords);
  return (
    <ConfigContext.Provider value={initialConfig}>
    <div className="as-react-table" id={id ? id + "-container" : ""}>
    <TableHeader
      id={id}
      lengthMenuText={lengthMenuText}
      recordLength={(dynamic) ? total_record : records.length}
      filterRecords={filterRecords}
      changePageSize={changePageSize}
      exportToExcel={() => exportToExcel(records,cloumns,initialConfig,initialState.filter_value,onSort,filterData)}
      exportToCSV={() => exportToCSV(records,columns,dynamic,onSort,initialState.filter_value,onFilterRecords)}
      exportToPDF={() => exportToPDF(records,cloumns,initialConfig)}
      extraButtons={extraButtons}/>
    <div className="row table-body asrt-table-body" style={style.table_body} id={(id) ? id + "-table-body" : ""}>
      <div className="col-md-12">
        <table className={className} id={id}>
          <thead className={tHeadClassName ? tHeadClassName : ''}>
            <tr>
              {
                columns.map((column, index) => {
                  let classText = (column.sortable) ? "sortable " : "",
                  width = (column.width) ? column.width : "",
                  align = (column.align) ? column.align : "",
                  sortOrder = "",
                  columnStyle = {};
                  if (column.sortable && initialState.sort.column == column.key) {
                    sortOrder = initialState.sort.order;
                    classText += (sortOrder) ? " " + sortOrder : "";
                    columnStyle = (sortOrder == "asc") ? style.sort_asc : style.sort_desc;
                  }

                  classText += " text-" + align;
                  if(column.TrOnlyClassName)
                    classText += " " + column.TrOnlyClassName;
                  return (<th
                    key={(column.key) ? column.key : column.text}
                    className={classText}
                    width={width}
                    style={columnStyle}
                    onClick={event => sortColumn(event, column, sortOrder)}>
                    {column.text}
                  </th>);
                })
              }
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="asrt-td-loading" align="center">
                  <div className="asrt-loading-textwrap">
                    <span className="asrt-loading-text">
                      {initialConfig.language.loading_text}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              (filterRecords.length) ? 
                filterRecords.map((record, rowIndex) => {
                  rowIndex = _.indexOf(records, record);
                  return (
                    <tr key={record[initialConfig.key_column]} onClick={(e) => onRowClicked(e, record, rowIndex)}>
                      {
                        columns.map((column) => {
                          if (column.cell && typeof column.cell === "function") {
                            return (<td className={column.className} key={(column.key) ? column.key : column.text}>{column.cell(record,rowIndex)}</td>);
                          }else if (record[column.key]) {
                            return (<td className={column.className} key={(column.key) ? column.key : column.text}>
                              {record[column.key]}
                            </td>);
                          }else {
                            return <td className={column.className} key={(column.key) ? column.key : column.text}></td>
                          }
                        })
                      }
                    </tr>
                  )
                }) : 
                (
                  <tr>
                    <td colSpan={columns.length} align="center">
                      {initialConfig.language.no_data_text}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
    <TableFooter
      id={id}
      isFirst={isFirst}
      isLast={isLast}
      paginationInfo={paginationInfo}
      pages={pages}
      page_number={initialState.page_number}
      is_temp_page={initialState.is_temp_page}
      temp_page_number={initialState.temp_page_number}
      firstPage={firstPage}
      lastPage={(e) => lastPage(e, pages)}
      previousPage={(e) => previousPage(e, initialState.page_number)}
      nextPage={(e) => nextPage(e, initialState.page_number)}
      goToPage={(e) => goToPage(e, pages,initialState.page_number, onStateChange,onPageChange)}
      changePageSize={changePageSize}
      onPageChange={onPageChange}
      onPageBlur={onPageBlur}/>
  </div>
  </ConfigContext.Provider>
  )
}


/**
* Define component display name
*/
ReactDatatable.displayName = 'ReactDatatable';