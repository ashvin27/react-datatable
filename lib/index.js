'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('./assets/css/style.css');

var _TableHeader = require('./components/TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableFooter = require('./components/TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is the React Component for ReactDatatable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @package        ReactDatatable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author         Ashvin Patel(patelash212@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date           14 Dec, 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ReactDatatable = function (_Component) {
  _inherits(ReactDatatable, _Component);

  function ReactDatatable(props) {
    _classCallCheck(this, ReactDatatable);

    var _this = _possibleConstructorReturn(this, (ReactDatatable.__proto__ || Object.getPrototypeOf(ReactDatatable)).call(this, props));

    _this.exportExcelRef = _react2.default.createRef();
    _this.sortColumn = _this.sortColumn.bind(_this);
    _this.numPages = _this.numPages.bind(_this);
    _this.exportToExcel = _this.exportToExcel.bind(_this);
    _this.exportToPDF = _this.exportToPDF.bind(_this);
    _this.exportToCSV = _this.exportToCSV.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.filterRecords = _this.filterRecords.bind(_this);
    _this.filterData = _this.filterData.bind(_this);
    _this.sortRecords = _this.sortRecords.bind(_this);
    _this.config = {
      button: {
        excel: props.config && props.config.button && props.config.button.excel ? props.config.button.excel : false,
        print: props.config && props.config.button && props.config.button.print ? props.config.button.print : false,
        csv: props.config && props.config.button && props.config.button.csv ? props.config.button.csv : false,
        extra: props.config && props.config.button && props.config.button.extra ? props.config.button.extra : false
      },
      filename: props.config && props.config.filename ? props.config.filename : "table",
      key_column: props.config && props.config.key_column ? props.config.key_column : "id",
      language: {
        length_menu: props.config && props.config.language && props.config.language.length_menu ? props.config.language.length_menu : "Show _MENU_ records per page",
        filter: props.config && props.config.language && props.config.language.filter ? props.config.language.filter : "Search in records...",
        info: props.config && props.config.language && props.config.language.info ? props.config.language.info : "Showing _START_ to _END_ of _TOTAL_ entries",
        pagination: {
          first: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.first ? props.config.language.pagination.first : "First",
          previous: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.previous ? props.config.language.pagination.previous : "Previous",
          next: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.next ? props.config.language.pagination.next : "Next",
          last: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.last ? props.config.language.pagination.last : "Last"
        },
        no_data_text: props.config && props.config.language && props.config.language.no_data_text ? props.config.language.no_data_text : 'No rows found',
        loading_text: props.config && props.config.language && props.config.language.loading_text ? props.config.language.loading_text : "Loading..."
      },
      length_menu: props.config && props.config.length_menu ? props.config.length_menu : [10, 25, 50, 75, 100],
      show_length_menu: props.config.show_length_menu != undefined ? props.config.show_length_menu : true,
      show_filter: props.config.show_filter != undefined ? props.config.show_filter : true,
      show_pagination: props.config.show_pagination != undefined ? props.config.show_pagination : true,
      show_info: props.config.show_info != undefined ? props.config.show_info : true,
      show_first: props.config.show_first != undefined ? props.config.show_first : true,
      show_last: props.config.show_last != undefined ? props.config.show_last : true,
      pagination: props.config.pagination ? props.config.pagination : 'basic'
    };
    _this.state = {
      is_temp_page: false,
      filter_value: "",
      page_size: props.config.page_size ? props.config.page_size : 10,
      page_number: 1,
      sort: props.config && props.config.sort ? props.config.sort : false
    };
    return _this;
  }

  _createClass(ReactDatatable, [{
    key: 'filterRecords',
    value: function filterRecords(e) {
      var _this2 = this;

      var value = e.target.value;
      this.setState({
        page_number: 1,
        filter_value: value
      }, function () {
        _this2.onChange();
      });
    }
  }, {
    key: 'changePageSize',
    value: function changePageSize(e) {
      var _this3 = this;

      var value = e.target.value;
      this.setState({
        page_size: value
      }, function () {
        _this3.onChange();
      });
    }
  }, {
    key: 'sortColumn',
    value: function sortColumn(event, column, sortOrder) {
      var _this4 = this;

      if (!column.sortable) return false;
      var newSortOrder = sortOrder == "asc" ? "desc" : "asc";
      this.setState({
        'sort': { column: column.key, order: newSortOrder }
      }, function () {
        _this4.onChange();
      });
    }
  }, {
    key: 'paginate',
    value: function paginate(records) {
      var page_size = this.state.page_size;
      var page_number = this.state.page_number;
      --page_number; // because pages logically start with 1, but technically with 0
      return records.slice(page_number * page_size, (page_number + 1) * page_size);
    }
  }, {
    key: 'numPages',
    value: function numPages(totalRecord) {
      return Math.ceil(totalRecord / this.state.page_size);
    }
  }, {
    key: 'isLast',
    value: function isLast() {
      // because for empty records page_number will still be 1
      if (this.pages == 0) {
        return true;
      }
      if (this.state.page_number == this.pages) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'isFirst',
    value: function isFirst() {
      if (this.state.page_number == 1) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'goToPage',
    value: function goToPage(e, pageNumber) {
      var _this5 = this;

      e.preventDefault();
      if (this.state.page_number == pageNumber) {
        return;
      }
      var pageState = {
        previous_page: this.state.page_number,
        current_page: pageNumber
      };
      this.setState({
        is_temp_page: false,
        page_number: pageNumber
      }, function () {
        _this5.props.onPageChange(pageState);
        _this5.onChange();
      });
    }
  }, {
    key: 'firstPage',
    value: function firstPage(e) {
      e.preventDefault();
      if (this.isFirst()) return;
      this.goToPage(e, 1);
    }
  }, {
    key: 'lastPage',
    value: function lastPage(e) {
      e.preventDefault();
      if (this.isLast()) return;
      this.goToPage(e, this.pages);
    }
  }, {
    key: 'previousPage',
    value: function previousPage(e) {
      e.preventDefault();
      if (this.isFirst()) return false;
      this.goToPage(e, this.state.page_number - 1);
    }
  }, {
    key: 'nextPage',
    value: function nextPage(e) {
      e.preventDefault();
      if (this.isLast()) return;
      this.goToPage(e, parseInt(this.state.page_number) + 1);
    }
  }, {
    key: 'onPageChange',
    value: function onPageChange(e) {
      var isInputChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (isInputChange) {
        this.setState({
          is_temp_page: true,
          temp_page_number: e.target.value
        });
      } else {
        if (e.key === 'Enter') {
          var pageNumber = e.target.value;
          this.goToPage(e, pageNumber);
        }
      }
    }
  }, {
    key: 'onPageBlur',
    value: function onPageBlur(e) {
      var pageNumber = e.target.value;
      this.goToPage(event, pageNumber);
    }
  }, {
    key: 'strip',
    value: function strip(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    }
  }, {
    key: 'getExportHtml',
    value: function getExportHtml() {
      var tableHtml = "<table>";
      tableHtml += "<thead>";
      tableHtml += "<tr>";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var column = _step.value;

          tableHtml += "<th>" + column.text + "</th>";
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      tableHtml += "</tr>";
      tableHtml += "</thead>";
      tableHtml += "<tbody>";

      // Filter records before export
      var filterRecords = this.props.records;
      if (this.props.dynamic === false) {
        var records = this.sortRecords(),
            filterValue = this.state.filter_value;
        filterRecords = records;

        if (filterValue) {
          filterRecords = this.filterData(records);
        }
      }

      for (var i in filterRecords) {
        var record = filterRecords[i];
        tableHtml += "<tr>";
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.props.columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _column = _step2.value;

            if (_column.cell && typeof _column.cell === "function") {
              var cellData = _server2.default.renderToStaticMarkup(_column.cell(record, i));
              cellData = this.strip(cellData);
              tableHtml += "<td>" + cellData + "</td>";
            } else if (record[_column.key]) {
              tableHtml += "<td>" + record[_column.key] + "</td>";
            } else {
              tableHtml += "<td></td>";
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        tableHtml += "</tr>";
      }
      tableHtml += "</tbody>";
      tableHtml += "</table>";

      return tableHtml;
    }
  }, {
    key: 'exportToExcel',
    value: function exportToExcel() {
      var downloadLink = void 0,
          dataType = 'application/vnd.ms-excel';

      var tableHtml = this.getExportHtml();

      // Specify file name
      var filename = this.config.filename ? this.config.filename + '.xls' : 'table.xls';
      // Create download link element
      downloadLink = document.createElement("a");
      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\uFEFF', tableHtml], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
        // Setting the file name
        downloadLink.download = filename;
        //triggering the function
        downloadLink.click();
      }
    }
  }, {
    key: 'exportToPDF',
    value: function exportToPDF() {
      var tableHtml = this.getExportHtml();

      var style = "<style>";
      style = style + "table {width: 100%;font: 17px Calibri;}";
      style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
      style = style + "padding: 2px 3px;text-align:left;}";
      style = style + "</style>";

      var win = window.open('', '_blank');
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
  }, {
    key: 'convertToCSV',
    value: function convertToCSV(objArray) {
      var array = (typeof objArray === 'undefined' ? 'undefined' : _typeof(objArray)) != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ',';
          line += array[i][index];
        }
        str += line + '\r\n';
      }
      return str;
    }
  }, {
    key: 'exportToCSV',
    value: function exportToCSV() {
      var headers = {};
      // add columns in sheet array
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.props.columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var column = _step3.value;

          headers[column.key] = '"' + column.text + '"';
        }

        // Filter records before export
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var filterRecords = this.props.records;
      if (this.props.dynamic === false) {
        var _records = this.sortRecords(),
            filterValue = this.state.filter_value;
        filterRecords = _records;

        if (filterValue) {
          filterRecords = this.filterData(_records);
        }
      }

      var records = [];
      // add data rows in sheet array
      for (var i in filterRecords) {
        var record = filterRecords[i],
            newRecord = {};
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.props.columns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _column2 = _step4.value;

            if (_column2.cell && typeof _column2.cell === "function") {
              var cellData = _server2.default.renderToStaticMarkup(_column2.cell(record, i));
              cellData = this.strip(cellData);
              newRecord[_column2.key] = cellData;
            } else if (record[_column2.key]) {
              var colValue = record[_column2.key];
              colValue = typeof colValue === "string" ? colValue.replace(/"/g, '""') : colValue;
              newRecord[_column2.key] = '"' + colValue + '"';
            } else {
              newRecord[_column2.key] = "";
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        records.push(newRecord);
      }
      if (headers) {
        records.unshift(headers);
      }
      // Convert Object to JSON
      var jsonObject = JSON.stringify(records);
      var csv = this.convertToCSV(jsonObject);
      var exportedFilename = this.config.filename + '.csv' || 'export.csv';
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      var tableData = {
        filter_value: this.state.filter_value,
        page_number: this.state.page_number,
        page_size: this.state.page_size,
        sort_order: this.state.sort
      };
      this.props.onChange(tableData);
    }
  }, {
    key: 'filterData',
    value: function filterData(records) {
      var _this6 = this;

      var filterValue = this.state.filter_value;
      return records.filter(function (record) {
        var allow = false;
        _lodash2.default.each(_this6.props.columns, function (column, key) {
          if (record[column.key]) {
            allow = _lodash2.default.includes(record[column.key].toString().toLowerCase(), filterValue.toString().toLowerCase()) ? true : allow;
          }
        });
        return allow;
      });
    }
  }, {
    key: 'sortRecords',
    value: function sortRecords() {
      var _this7 = this;

      if (this.state.sort) {
        return _lodash2.default.orderBy(this.props.records, function (o) {
          var colVal = o[_this7.state.sort.column];
          var typeofColVal = typeof colVal === 'undefined' ? 'undefined' : _typeof(colVal);

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
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var filterRecords = void 0,
          totalRecords = void 0,
          pages = void 0,
          isFirst = void 0,
          isLast = void 0;
      if (this.props.dynamic === false) {
        var records = this.props.onSort ? this.props.onSort(this.state.sort.column, this.props.records, this.state.sort.order) : this.sortRecords(),
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
      } else {
        filterRecords = this.props.records;
        totalRecords = this.props.total_record;
        pages = this.pages = this.numPages(totalRecords);
        isFirst = this.isFirst();
        isLast = this.isLast();
      }

      var startRecords = this.state.page_number * this.state.page_size - (this.state.page_size - 1);
      var endRecords = this.state.page_size * this.state.page_number;
      endRecords = endRecords > totalRecords ? totalRecords : endRecords;

      var lengthMenuText = this.config.language.length_menu;
      lengthMenuText = lengthMenuText.split('_MENU_');
      var paginationInfo = this.config.language.info;
      paginationInfo = paginationInfo.replace('_START_', this.state.page_number == 1 ? 1 : startRecords);
      paginationInfo = paginationInfo.replace('_END_', endRecords);
      paginationInfo = paginationInfo.replace('_TOTAL_', totalRecords);
      return _react2.default.createElement(
        'div',
        { className: 'as-react-table', id: this.props.id ? this.props.id + "-container" : "" },
        _react2.default.createElement(_TableHeader2.default, {
          config: this.config,
          id: this.props.id,
          lengthMenuText: lengthMenuText,
          recordLength: this.props.dynamic ? this.props.total_record : this.props.records.length,
          filterRecords: this.filterRecords.bind(this),
          changePageSize: this.changePageSize.bind(this),
          exportToExcel: this.exportToExcel.bind(this),
          exportToCSV: this.exportToCSV.bind(this),
          exportToPDF: this.exportToPDF.bind(this),
          extraButtons: this.props.extraButtons }),
        _react2.default.createElement(
          'div',
          { className: 'row table-body asrt-table-body', style: _style2.default.table_body, id: this.props.id ? this.props.id + "-table-body" : "" },
          _react2.default.createElement(
            'div',
            { className: 'col-md-12' },
            _react2.default.createElement(
              'table',
              { className: this.props.className, id: this.props.id },
              _react2.default.createElement(
                'thead',
                { className: this.props.tHeadClassName ? this.props.tHeadClassName : '' },
                _react2.default.createElement(
                  'tr',
                  null,
                  this.props.columns.map(function (column, index) {
                    var classText = column.sortable ? "sortable " : "",
                        width = column.width ? column.width : "",
                        align = column.align ? column.align : "",
                        sortOrder = "",
                        columnStyle = {};
                    if (column.sortable && _this8.state.sort.column == column.key) {
                      sortOrder = _this8.state.sort.order;
                      classText += sortOrder ? " " + sortOrder : "";
                      columnStyle = sortOrder == "asc" ? _style2.default.sort_asc : _style2.default.sort_desc;
                    }

                    classText += " text-" + align;
                    if (column.TrOnlyClassName) classText += " " + column.TrOnlyClassName;
                    return _react2.default.createElement(
                      'th',
                      {
                        key: column.key ? column.key : column.text,
                        className: classText,
                        width: width,
                        style: columnStyle,
                        onClick: function onClick(event) {
                          return _this8.sortColumn(event, column, sortOrder);
                        } },
                      column.text
                    );
                  })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                this.props.loading === true ? _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { colSpan: this.props.columns.length, className: 'asrt-td-loading', align: 'center' },
                    _react2.default.createElement(
                      'div',
                      { className: 'asrt-loading-textwrap' },
                      _react2.default.createElement(
                        'span',
                        { className: 'asrt-loading-text' },
                        this.config.language.loading_text
                      )
                    )
                  )
                ) : filterRecords.length ? filterRecords.map(function (record, rowIndex) {
                  rowIndex = _lodash2.default.indexOf(_this8.props.records, record);
                  return _react2.default.createElement(
                    'tr',
                    { key: record[_this8.config.key_column], onClick: function onClick(e) {
                        return _this8.props.onRowClicked(e, record, rowIndex);
                      } },
                    _this8.props.columns.map(function (column, colIndex) {
                      if (column.cell && typeof column.cell === "function") {
                        return _react2.default.createElement(
                          'td',
                          { className: column.className, key: column.key ? column.key : column.text },
                          column.cell(record, rowIndex)
                        );
                      } else if (record[column.key]) {
                        return _react2.default.createElement(
                          'td',
                          { className: column.className, key: column.key ? column.key : column.text },
                          record[column.key]
                        );
                      } else {
                        return _react2.default.createElement('td', { className: column.className, key: column.key ? column.key : column.text });
                      }
                    })
                  );
                }) : _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { colSpan: this.props.columns.length, align: 'center' },
                    this.config.language.no_data_text
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(_TableFooter2.default, {
          config: this.config,
          id: this.props.id,
          isFirst: isFirst,
          isLast: isLast,
          paginationInfo: paginationInfo,
          pages: pages,
          page_number: this.state.page_number,
          is_temp_page: this.state.is_temp_page,
          temp_page_number: this.state.temp_page_number,
          firstPage: this.firstPage.bind(this),
          lastPage: this.lastPage.bind(this),
          previousPage: this.previousPage.bind(this),
          nextPage: this.nextPage.bind(this),
          goToPage: this.goToPage.bind(this),
          changePageSize: this.changePageSize.bind(this),
          onPageChange: this.onPageChange.bind(this),
          onPageBlur: this.onPageBlur.bind(this) })
      );
    }
  }]);

  return ReactDatatable;
}(_react.Component);

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
    key_column: "id",
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
  onChange: function onChange() {},
  onPageChange: function onPageChange() {},
  onRowClicked: function onRowClicked() {}
};

exports.default = ReactDatatable;