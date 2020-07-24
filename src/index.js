/**
 * This is the React Component for ReactDatatable
 *
 * @package        ReactDatatable
 * @author         Ashvin Patel(patelash212@gmail.com)
 * @date           14 Dec, 2018
 */

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import './assets/css/style.css';
import TableHeader from './components/TableHeader';
import TableFooter from './components/TableFooter';
import style from './style';

class ReactDatatable extends Component {

  constructor(props) {
    super(props);
    this.exportExcelRef = React.createRef();
    this.sortColumn = this.sortColumn.bind(this);
    this.numPages = this.numPages.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.exportToPDF = this.exportToPDF.bind(this);
    this.exportToCSV = this.exportToCSV.bind(this);
    this.onChange = this.onChange.bind(this);
    this.filterRecords = this.filterRecords.bind(this);
    this.filterData = this.filterData.bind(this);
    this.sortRecords = this.sortRecords.bind(this);
    this.config = {
      button: {
        excel: (props.config && props.config.button && props.config.button.excel) ? props.config.button.excel : false,
        print: (props.config && props.config.button && props.config.button.print) ? props.config.button.print : false,
        csv: (props.config && props.config.button && props.config.button.csv) ? props.config.button.csv : false,
        extra : (props.config && props.config.button && props.config.button.extra) ? props.config.button.extra : false,
      },
      filename: (props.config && props.config.filename) ? props.config.filename : "table",
      key_column: props.config && props.config.key_column ? props.config.key_column : "id",
      language: {
        length_menu: (props.config && props.config.language && props.config.language.length_menu) ? props.config.language.length_menu : "Show _MENU_ records per page",
        filter: (props.config && props.config.language && props.config.language.filter) ? props.config.language.filter : "Search in records...",
        info: (props.config && props.config.language && props.config.language.info) ? props.config.language.info : "Showing _START_ to _END_ of _TOTAL_ entries",
        pagination: {
          first: (props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.first) ? props.config.language.pagination.first : "First",
          previous: (props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.previous) ? props.config.language.pagination.previous : "Previous",
          next: (props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.next) ? props.config.language.pagination.next : "Next",
          last: (props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.last) ? props.config.language.pagination.last : "Last"
        },
        no_data_text: (props.config && props.config.language && props.config.language.no_data_text) ? props.config.language.no_data_text : 'No rows found',
        loading_text: (props.config && props.config.language && props.config.language.loading_text) ? props.config.language.loading_text : "Loading..."
      },
      length_menu: (props.config && props.config.length_menu) ? props.config.length_menu : [10, 25, 50, 75, 100],
      show_length_menu: (props.config.show_length_menu != undefined) ? props.config.show_length_menu : true,
      show_filter: (props.config.show_filter != undefined) ? props.config.show_filter : true,
      show_pagination: (props.config.show_pagination != undefined) ? props.config.show_pagination : true,
      show_info: (props.config.show_info != undefined) ? props.config.show_info : true,
      show_first: (props.config.show_first != undefined) ? props.config.show_first : true,
      show_last: (props.config.show_last != undefined) ? props.config.show_last : true,
      pagination: (props.config.pagination) ? props.config.pagination : 'basic'
    };
    this.state = {
      is_temp_page: false,
      filter_value: "",
      page_size: (props.config.page_size) ? props.config.page_size : 10,
      page_number: 1,
      sort: (props.config && props.config.sort) ? props.config.sort : false
    };
  }

  filterRecords(e) {
    let value = e.target.value;
    this.setState({
      page_number: 1,
      filter_value: value
    }, () => {
      this.onChange();
    });
  }

  changePageSize(e) {
    let value = e.target.value;
    this.setState({
      page_size: value
    }, () => {
      this.onChange();
    });
  }

  sortColumn(event, column, sortOrder) {
    if (!column.sortable) return false;
    let newSortOrder = (sortOrder == "asc") ? "desc" : "asc";
    this.setState({
      'sort': { column: column.key, order: newSortOrder }
    }, () => {
      this.onChange();
    });
  }

  paginate(records) {
    let page_size = this.state.page_size;
    let page_number = this.state.page_number;
    --page_number; // because pages logically start with 1, but technically with 0
    return records.slice(page_number * page_size, (page_number + 1) * page_size);
  }

  numPages(totalRecord){
    return Math.ceil(totalRecord / this.state.page_size);
  }

  isLast() {
    // because for empty records page_number will still be 1
    if(this.pages == 0){
      return true;
    }
    if (this.state.page_number == this.pages) {
      return true
    } else {
      return false;
    }
  }

  isFirst() {
    if (this.state.page_number == 1) {
      return true;
    } else {
      return false;
    }
  }

  goToPage(e, pageNumber){
    e.preventDefault();
    if(this.state.page_number == pageNumber){
      return;
    }
    let pageState = {
      previous_page: this.state.page_number,
      current_page: pageNumber
    };
    this.setState({
      is_temp_page: false,
      page_number: pageNumber
    }, () => {
      this.props.onPageChange(pageState);
      this.onChange();
    });
  }

  firstPage(e) {
    e.preventDefault();
    if(this.isFirst()) return;
    this.goToPage(e, 1);
  }

  lastPage(e) {
    e.preventDefault();
    if(this.isLast()) return;
    this.goToPage(e, this.pages);
  }

  previousPage(e) {
    e.preventDefault();
    if(this.isFirst()) return false;
    this.goToPage(e, this.state.page_number - 1);
  }

  nextPage(e) {
    e.preventDefault();
    if(this.isLast()) return;
    this.goToPage(e, parseInt(this.state.page_number) + 1);
  }

  onPageChange(e, isInputChange = false) {
    if(isInputChange){
      this.setState({
        is_temp_page : true,
        temp_page_number: e.target.value
      });
    } else {
      if (e.key === 'Enter') {
        let pageNumber = e.target.value;
        this.goToPage(e, pageNumber);
      }
    }
  }

  onPageBlur(e){
    let pageNumber = e.target.value;
    this.goToPage(event, pageNumber);
  }

  strip(html){
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  getExportHtml(){
    let tableHtml = "<table>";
    tableHtml += "<thead>";
    tableHtml += "<tr>";
    for (let column of this.props.columns) {
      tableHtml += "<th>" + column.text + "</th>";
    }
    tableHtml += "</tr>";
    tableHtml += "</thead>";
    tableHtml += "<tbody>";

    // Filter records before export
    let filterRecords = this.props.records;
    if(this.props.dynamic === false){
      let records = this.sortRecords(),
        filterValue = this.state.filter_value;
        filterRecords = records;

      if (filterValue) {
        filterRecords = this.filterData(records);
      }
    }

    for (let i in filterRecords) {
      let record = filterRecords[i];
      tableHtml += "<tr>";
      for (let column of this.props.columns) {
        if (column.cell && typeof column.cell === "function") {
          let cellData =  ReactDOMServer.renderToStaticMarkup(column.cell(record, i));
              cellData = this.strip(cellData);
          tableHtml += "<td>" + cellData + "</td>";
        }else if (record[column.key]) {
          tableHtml += "<td>" + record[column.key] + "</td>";
        } else {
          tableHtml += "<td></td>";
        }
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</tbody>";
    tableHtml += "</table>";

    return tableHtml;
  }

  exportToExcel(){
    let downloadLink, dataType = 'application/vnd.ms-excel';

    let tableHtml = this.getExportHtml();
    
    // Specify file name
    let filename = this.config.filename ? this.config.filename + '.xls':'table.xls';
    // Create download link element
    downloadLink = document.createElement("a");
    if(navigator.msSaveOrOpenBlob){
      let blob = new Blob(['\ufeff', tableHtml], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
      // Setting the file name
      downloadLink.download = filename;
      //triggering the function
      downloadLink.click();
    }
  }

  exportToPDF() {
    let tableHtml = this.getExportHtml();

    let style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align:left;}";
    style = style + "</style>";

    let win = window.open('', '_blank');
    win.document.write('<html><head>');
    win.document.write('<title>' + this.config.filename + '</title>');
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<h1>' + this.config.filename + '</h1>');
    win.document.write(tableHtml);
    win.document.write('</body></html>');
    win.print();
    win.close();
  }

  convertToCSV(objArray){
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ','
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  exportToCSV(){
    let headers = {};
    // add columns in sheet array
    for (let column of this.props.columns) {
      headers[column.key] = '"' + column.text + '"';
    }

    // Filter records before export
    let filterRecords = this.props.records;
    if(this.props.dynamic === false){
      let records = this.sortRecords(),
        filterValue = this.state.filter_value;
        filterRecords = records;

      if (filterValue) {
        filterRecords = this.filterData(records);
      }
    }

    let records = [];
    // add data rows in sheet array
    for (let i in filterRecords) {
      let record = filterRecords[i],
        newRecord = {};
      for (let column of this.props.columns) {
        if (column.cell && typeof column.cell === "function") {
          let cellData =  ReactDOMServer.renderToStaticMarkup(column.cell(record, i));
              cellData = this.strip(cellData);
          newRecord[column.key] = cellData;
        } else if (record[column.key]) {
          let colValue  = record[column.key];
          colValue = (typeof colValue === "string") ? colValue.replace(/"/g, '""') : colValue;
          newRecord[column.key] = '"' + colValue + '"';
        } else {
          newRecord[column.key] = "";
        }
      }
      records.push(newRecord);
    }
    if (headers) {
      records.unshift(headers);
    }
    // Convert Object to JSON
    let jsonObject = JSON.stringify(records);
    let csv = this.convertToCSV(jsonObject);
    let exportedFilename = this.config.filename + '.csv' || 'export.csv';
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }
  }

  onChange(){
    let tableData = {
      filter_value: this.state.filter_value,
      page_number: this.state.page_number,
      page_size: this.state.page_size,
      sort_order: this.state.sort
    };
    this.props.onChange(tableData);
  }

  filterData(records) {
    let filterValue = this.state.filter_value;
    return records.filter((record) => {
      let allow = false;
      _.each(this.props.columns, (column, key) => {
        if (record[column.key]) {
          allow = _.includes(record[column.key].toString().toLowerCase(), filterValue.toString().toLowerCase()) ? true : allow;
        }
      });
      return allow;
    });
  }

  sortRecords(){
    if(this.state.sort){
      return _.orderBy(this.props.records, o => {
        let colVal = o[this.state.sort.column];
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
      }, [this.state.sort.order]);
    } else {
      return this.props.records;
    }
  }

  render() {
    let filterRecords, totalRecords, pages, isFirst, isLast;
    if(this.props.dynamic === false){
      let records = (this.props.onSort) ? this.props.onSort(this.state.sort.column, this.props.records, this.state.sort.order) : this.sortRecords(),
        filterValue = this.state.filter_value;
        filterRecords = records;

      if (filterValue) {
        filterRecords = this.filterData(records);
      }
      totalRecords = Array.isArray(filterRecords) ? filterRecords.length : 0;
      pages = this.pages = this.numPages(totalRecords);
      isFirst = this.isFirst();
      isLast = this.isLast();
      filterRecords = Array.isArray(filterRecords) ? this.paginate(filterRecords) : [];
    }else{
      filterRecords = this.props.records;
      totalRecords = this.props.total_record;
      pages = this.pages = this.numPages(totalRecords);
      isFirst = this.isFirst();
      isLast = this.isLast();
    }

    let startRecords = (this.state.page_number * this.state.page_size) - (this.state.page_size - 1);
    let endRecords = this.state.page_size * this.state.page_number;
    endRecords = (endRecords > totalRecords) ? totalRecords : endRecords;

    let lengthMenuText = this.config.language.length_menu;
    lengthMenuText = lengthMenuText.split('_MENU_');
    let paginationInfo = this.config.language.info;
    paginationInfo = paginationInfo.replace('_START_', (this.state.page_number == 1) ? 1 : startRecords);
    paginationInfo = paginationInfo.replace('_END_', endRecords);
    paginationInfo = paginationInfo.replace('_TOTAL_', totalRecords);
    return (
      <div className="as-react-table" id={(this.props.id) ? this.props.id + "-container" : ""}>
        <TableHeader
          config={this.config}
          id={this.props.id}
          lengthMenuText={lengthMenuText}
          recordLength={(this.props.dynamic) ? this.props.total_record : this.props.records.length}
          filterRecords={this.filterRecords.bind(this)}
          changePageSize={this.changePageSize.bind(this)}
          exportToExcel={this.exportToExcel.bind(this)}
          exportToCSV={this.exportToCSV.bind(this)}
          exportToPDF={this.exportToPDF.bind(this)}
          extraButtons={this.props.extraButtons}/>
        <div className="row table-body asrt-table-body" style={style.table_body} id={(this.props.id) ? this.props.id + "-table-body" : ""}>
          <div className="col-md-12">
            <table className={this.props.className} id={this.props.id}>
              <thead className={this.props.tHeadClassName ? this.props.tHeadClassName : ''}>
                <tr>
                  {
                    this.props.columns.map((column, index) => {
                      let classText = (column.sortable) ? "sortable " : "",
                      width = (column.width) ? column.width : "",
                      align = (column.align) ? column.align : "",
                      sortOrder = "",
                      columnStyle = {};
                      if (column.sortable && this.state.sort.column == column.key) {
                        sortOrder = this.state.sort.order;
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
                        onClick={event => this.sortColumn(event, column, sortOrder)}>
                        {column.text}
                      </th>);
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {this.props.loading === true ? (
                  <tr>
                    <td colSpan={this.props.columns.length} className="asrt-td-loading" align="center">
                      <div className="asrt-loading-textwrap">
                        <span className="asrt-loading-text">
                          {this.config.language.loading_text}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  (filterRecords.length) ? 
                    filterRecords.map((record, rowIndex) => {
                      rowIndex = _.indexOf(this.props.records, record);
                      return (
                        <tr key={record[this.config.key_column]} onClick={(e) => this.props.onRowClicked(e, record, rowIndex)}>
                          {
                            this.props.columns.map((column, colIndex) => {
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
                        <td colSpan={this.props.columns.length} align="center">
                          {this.config.language.no_data_text}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <TableFooter
          config={this.config}
          id={this.props.id}
          isFirst={isFirst}
          isLast={isLast}
          paginationInfo={paginationInfo}
          pages={pages}
          page_number={this.state.page_number}
          is_temp_page={this.state.is_temp_page}
          temp_page_number={this.state.temp_page_number}
          firstPage={this.firstPage.bind(this)}
          lastPage={this.lastPage.bind(this)}
          previousPage={this.previousPage.bind(this)}
          nextPage={this.nextPage.bind(this)}
          goToPage={this.goToPage.bind(this)}
          changePageSize={this.changePageSize.bind(this)}
          onPageChange={this.onPageChange.bind(this)}
          onPageBlur={this.onPageBlur.bind(this)}/>
      </div>
    )
  }
}

/**
* Define component display name
*/
ReactDatatable.displayName = 'ReactDatatable';

/**
* Define defaultProps for this component
*/
ReactDatatable.defaultProps = {
  id: "as-react-datatable",
  className: "table table-bordered table-striped",
  columns: [],
  config: {
    button: {
      excel: false,
      print: false,
      csv: false
    },
    filename: "table",
    key_column:"id",
    language: {
      length_menu: "Show _MENU_ records per page",
      filter: "Search in records...",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      pagination: {
        first: "First",
        previous: "Previous",
        next: "Next",
        last: "Last"
      }
    },
    length_menu: [10, 25, 50, 75, 100],
    no_data_text: "No rows found",
    page_size: 10,
    sort: {
      column: "test",
      order: "asc"
    },
    show_length_menu: true,
    show_filter: true,
    show_pagination: true,
    show_info: true,
    show_first: true,
    show_last: true
  },
  dynamic: false,
  records: [],
  total_record: 0,
  onChange: () => { },
  onPageChange: () => { },
  onRowClicked: () => { }
}

export default ReactDatatable;
