'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('./style.css');

var _upArrow = require('./up-arrow.png');

var _upArrow2 = _interopRequireDefault(_upArrow);

var _downArrow = require('./down-arrow.png');

var _downArrow2 = _interopRequireDefault(_downArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is the React Component for ReactDatatable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @package        ReactDatatable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author         Ashvin Patel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date           14 Dec, 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var style = {
  table_body: {
    marginTop: '16px'
  },
  table_size: {
    background: 'none',
    border: 'none',
    padding: 0
  },
  table_size_dropdown: {
    width: '70px',
    flex: 'none',
    margin: '0px 10px',
    display: 'inline-block',
    float: 'none'
  },
  table_filter: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '5px',
    width: '250px'
  },
  table_tool: {
    display: 'inline-block',
    verticalAlign: 'top'
  },
  table_tool_btn: {
    marginRight: '5px'
  },
  sort_asc: {
    backgroundImage: 'url(' + _upArrow2.default + ')'
  },
  sort_desc: {
    backgroundImage: 'url(' + _downArrow2.default + ')'
  }
};

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
    _this.config = {
      button: {
        excel: props.config && props.config.button && props.config.button.excel ? props.config.button.excel : false,
        print: props.config && props.config.button && props.config.button.print ? props.config.button.print : false,
        csv: props.config && props.config.button && props.config.button.csv ? props.config.button.csv : false,
        extra: props.config && props.config.button && props.config.button.extra ? props.config.button.extra : false
      },
      filename: props.config && props.config.filename ? props.config.filename : "table",
      language: {
        length_menu: props.config && props.config.language && props.config.language.length_menu ? props.config.language.length_menu : "Show _MENU_ records per page",
        filter: props.config && props.config.language && props.config.language.filter ? props.config.language.filter : "Search in records...",
        info: props.config && props.config.language && props.config.language.info ? props.config.language.info : "Showing _START_ to _END_ of _TOTAL_ entries",
        pagination: {
          first: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.first ? props.config.language.pagination.first : "First",
          previous: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.previous ? props.config.language.pagination.previous : "Previous",
          next: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.next ? props.config.language.pagination.next : "Next",
          last: props.config && props.config.language && props.config.language.pagination && props.config.language.pagination.last ? props.config.language.pagination.last : "Last"
        }
      },
      length_menu: props.config && props.config.length_menu ? props.config.length_menu : [10, 25, 50, 75, 100],
      no_data_text: props.config && props.config.no_data_text ? props.config.no_data_text : 'No rows found',
      show_length_menu: props.config.show_length_menu != undefined ? props.config.show_length_menu : true,
      show_filter: props.config.show_filter != undefined ? props.config.show_filter : true,
      show_pagination: props.config.show_pagination != undefined ? props.config.show_pagination : true,
      show_info: props.config.show_info != undefined ? props.config.show_info : true,
      show_first: props.config.show_first != undefined ? props.config.show_first : true,
      show_last: props.config.show_last != undefined ? props.config.show_last : true
    };
    _this.state = {
      filter_value: "",
      page_size: props.config.page_size ? props.config.page_size : 10,
      page_number: 1,
      sort: props.config && props.config.sort ? props.config.sort : { column: props.columns[0].key, order: "asc" }
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
    value: function sortColumn(column, sortOrder) {
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
    key: 'previousPage',
    value: function previousPage(e) {
      var _this5 = this;

      e.preventDefault();
      var nextPage = this.state.page_number - 1,
          pageState = {
        previous_page: this.state.page_number,
        current_page: nextPage
      };
      if (this.isFirst()) return false;
      this.setState({
        page_number: nextPage
      }, function () {
        _this5.props.onPageChange(pageState);
        _this5.onChange();
      });
    }
  }, {
    key: 'nextPage',
    value: function nextPage(e) {
      var _this6 = this;

      e.preventDefault();
      var nextPage = this.state.page_number + 1,
          pageState = {
        previous_page: this.state.page_number,
        current_page: nextPage
      };
      if (this.isLast()) return false;
      this.setState({
        page_number: nextPage
      }, function () {
        _this6.props.onPageChange(pageState);
        _this6.onChange();
      });
    }
  }, {
    key: 'firstPage',
    value: function firstPage(e) {
      var _this7 = this;

      e.preventDefault();
      var pageState = {
        previous_page: this.state.page_number,
        current_page: 1
      };
      if (this.isFirst()) return false;
      this.setState({
        page_number: 1
      }, function () {
        _this7.props.onPageChange(pageState);
        _this7.onChange();
      });
    }
  }, {
    key: 'lastPage',
    value: function lastPage(e) {
      var _this8 = this;

      e.preventDefault();
      var pageState = {
        previous_page: this.state.page_number,
        current_page: this.pages
      };
      if (this.isLast()) return false;
      this.setState({
        page_number: this.pages
      }, function () {
        _this8.props.onPageChange(pageState);
        _this8.onChange();
      });
    }
  }, {
    key: 'isLast',
    value: function isLast() {
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
    key: 'exportToExcel',
    value: function exportToExcel() {
      var sTable = "<table>";
      sTable += "<thead>";
      sTable += "<tr>";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var column = _step.value;

          sTable += "<th>" + column.text + "</th>";
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

      sTable += "</tr>";
      sTable += "</thead>";
      sTable += "<tbody>";
      for (var i in this.props.records) {
        var record = this.props.records[i];
        sTable += "<tr>";
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.props.columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _column = _step2.value;

            if (_column.cell && typeof _column.cell === "function") {
              sTable += "<td></td>";
            } else if (record[_column.key]) {
              sTable += "<td>" + record[_column.key] + "</td>";
            } else {
              sTable += "<td></td>";
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

        sTable += "</tr>";
      }
      sTable += "</tbody>";
      sTable += "</table>";
      var uri = 'data:application/vnd.ms-excel;base64,',
          template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
          base64 = function base64(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
          format = function format(s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };
      var ctx = {
        worksheet: this.config.filename || 'Worksheet',
        table: sTable
      },
          href = uri + base64(format(template, ctx));
      var anc = document.createElement('a');
      anc.setAttribute('href', href);
      anc.setAttribute('download', this.config.filename + '.xlsx');
      anc.click();
    }
  }, {
    key: 'exportToPDF',
    value: function exportToPDF() {
      var sTable = "";
      sTable += "<table>";
      sTable += "<thead>";
      sTable += "<tr>";
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.props.columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var column = _step3.value;

          sTable += "<th>" + column.text + "</th>";
        }
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

      sTable += "</tr>";
      sTable += "</thead>";
      sTable += "<tbody>";
      for (var i in this.props.records) {
        var record = this.props.records[i];
        sTable += "<tr>";
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.props.columns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _column2 = _step4.value;

            if (_column2.cell && typeof _column2.cell === "function") {
              sTable += "<td></td>";
            } else if (record[_column2.key]) {
              sTable += "<td>" + record[_column2.key] + "</td>";
            } else {
              sTable += "<td></td>";
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

        sTable += "</tr>";
      }
      sTable += "</tbody>";
      sTable += "</table>";

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
      win.document.write(sTable);
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
    value: function exportToCSV(headers, items, fileTitle) {
      var headers = {};
      // add columns in sheet array
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.props.columns[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var column = _step5.value;

          headers[column.key] = '"' + column.text + '"';
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var records = [];
      // add data rows in sheet array
      for (var i in this.props.records) {
        var record = this.props.records[i],
            newRecord = {};
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.props.columns[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _column3 = _step6.value;

            if (_column3.cell && typeof _column3.cell === "function") {
              newRecord[_column3.key] = "";
            } else if (record[_column3.key]) {
              var colValue = record[_column3.key].replace(/"/g, '""');
              newRecord[_column3.key] = '"' + colValue + '"';
            } else {
              newRecord[_column3.key] = "";
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
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
      var exportedFilenmae = this.config.filename + '.csv' || 'export.csv';
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
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
      var _this9 = this;

      var filterValue = this.state.filter_value;
      return records.filter(function (record) {
        var allow = false;
        _lodash2.default.each(_this9.props.columns, function (column, key) {
          if (record[column.key]) {
            allow = _lodash2.default.includes(record[column.key].toString().toLowerCase(), filterValue.toString().toLowerCase()) ? true : allow;
          }
        });
        return allow;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

      var filterRecords = void 0,
          totalRecords = void 0,
          pages = void 0,
          isFirst = void 0,
          isLast = void 0;
      if (this.props.dynamic === false) {
        // let records = _.orderBy(this.props.records, [{ [this.state.sort.column]: Number }], [this.state.sort.order]),
        var records = _lodash2.default.orderBy(this.props.records, function (o) {
          var colVal = o[_this10.state.sort.column];
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
        }, [this.state.sort.order]),
            filterValue = this.state.filter_value;
        filterRecords = records;
        if (filterValue) {
          filterRecords = this.filterData(records);
        }
        totalRecords = filterRecords.length;
        pages = this.pages = this.numPages(totalRecords);
        isFirst = this.isFirst();
        isLast = this.isLast();
        filterRecords = this.paginate(filterRecords);
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
        _react2.default.createElement(TableHeader, {
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
          { className: 'row table-body asrt-table-body', style: style.table_body, id: this.props.id ? this.props.id + "-table-body" : "" },
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
                    if (column.sortable && _this10.state.sort.column == column.key) {
                      sortOrder = _this10.state.sort.order;
                      classText += sortOrder ? " " + sortOrder : "";
                      columnStyle = sortOrder == "asc" ? style.sort_asc : style.sort_desc;
                    }

                    classText += " text-" + align;
                    /*if(column.className)
                    classText += " " + column.className;*/
                    if (column.TrOnlyClassName) classText += " " + column.TrOnlyClassName;
                    return _react2.default.createElement(
                      'th',
                      {
                        key: column.key ? column.key : column.text,
                        className: classText,
                        width: width,
                        style: columnStyle,
                        onClick: function onClick() {
                          return _this10.sortColumn(column, sortOrder);
                        } },
                      column.text
                    );
                  })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                filterRecords.length ? filterRecords.map(function (record, rowIndex) {
                  rowIndex = _lodash2.default.indexOf(_this10.props.records, record);
                  return _react2.default.createElement(
                    'tr',
                    { key: record.id, onClick: function onClick(e) {
                        return _this10.props.onRowClicked(e, record, rowIndex);
                      } },
                    _this10.props.columns.map(function (column, colIndex) {
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
                    this.config.no_data_text
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(TableFooter, {
          config: this.config,
          id: this.props.id,
          isFirst: isFirst,
          isLast: isLast,
          paginationInfo: paginationInfo,
          page_number: this.state.page_number,
          firstPage: this.firstPage.bind(this),
          lastPage: this.lastPage.bind(this),
          previousPage: this.previousPage.bind(this),
          nextPage: this.nextPage.bind(this),
          changePageSize: this.changePageSize.bind(this) })
      );
    }
  }]);

  return ReactDatatable;
}(_react.Component);

function TableHeader(props) {
  if (props.config.show_length_menu == true || props.config.show_filter == true || props.config.button.excel == true || props.config.button.csv == true || props.config.button.print == true) {
    return _react2.default.createElement(
      'div',
      { className: 'row table-head asrt-table-head', id: props.id ? props.id + "-table-head" : "" },
      _react2.default.createElement(
        'div',
        { className: 'col-md-6' },
        props.config.show_length_menu ? _react2.default.createElement(
          'div',
          { className: 'input-group asrt-page-length' },
          _react2.default.createElement(
            'div',
            { className: 'input-group-addon input-group-prepend' },
            _react2.default.createElement(
              'span',
              { className: 'input-group-text', style: style.table_size },
              props.lengthMenuText[0] ? props.lengthMenuText[0] : ''
            )
          ),
          _lodash2.default.includes(props.config.language.length_menu, '_MENU_') ? _react2.default.createElement(
            'select',
            { type: 'text', className: 'form-control', style: style.table_size_dropdown,
              onChange: props.changePageSize },
            props.config.length_menu.map(function (value, key) {
              return _react2.default.createElement(
                'option',
                { key: value },
                value
              );
            }),
            _react2.default.createElement(
              'option',
              { value: props.recordLength },
              'All'
            )
          ) : null,
          _react2.default.createElement(
            'div',
            { className: 'input-group-addon input-group-prepend' },
            _react2.default.createElement(
              'span',
              { className: 'input-group-text', style: style.table_size },
              props.lengthMenuText[1] ? props.lengthMenuText[1] : ''
            )
          )
        ) : null
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-6 float-right text-right' },
        props.config.show_filter ? _react2.default.createElement(
          'div',
          { className: 'table_filter', style: style.table_filter },
          _react2.default.createElement('input', {
            type: 'search',
            className: 'form-control',
            placeholder: props.config.language.filter,
            onChange: props.filterRecords })
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'table_tools', style: style.table_tool },
          props.config.button.excel ? _react2.default.createElement(
            'button',
            { className: 'btn btn-primary buttons-excel',
              tabIndex: '0',
              'aria-controls': 'configuration_tbl',
              title: 'Export to Excel',
              style: style.table_tool_btn,
              onClick: props.exportToExcel },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('i', { className: 'fa fa-file-excel-o', 'aria-hidden': 'true' })
            )
          ) : null,
          props.config.button.csv ? _react2.default.createElement(
            'button',
            { className: 'btn btn-primary buttons-csv',
              tabIndex: '0',
              'aria-controls': 'configuration_tbl',
              title: 'Export to CSV',
              style: style.table_tool_btn,
              onClick: props.exportToCSV },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('i', { className: 'fa fa-file-text-o', 'aria-hidden': 'true' })
            )
          ) : null,
          props.config.button.print ? _react2.default.createElement(
            'button',
            { className: 'btn btn-primary buttons-pdf',
              tabIndex: '0',
              'aria-controls': 'configuration_tbl',
              title: 'Export to PDF',
              style: style.table_tool_btn,
              onClick: props.exportToPDF },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('i', { className: 'glyphicon glyphicon-print fa fa-print', 'aria-hidden': 'true' })
            )
          ) : null,
          props.config.button.extra == true ? props.extraButtons.map(function (elem, index) {
            elem.clickCount = 0;
            elem.singleClickTimer = '';
            return _react2.default.createElement(
              'button',
              { className: elem.className ? elem.className : "btn btn-primary buttons-pdf",
                tabIndex: '0',
                'aria-controls': 'configuration_tbl',
                title: elem.title ? elem.title : "Export to PDF",
                style: style.table_tool_btn,
                onClick: function onClick(event) {
                  elem.onClick(event);
                },
                key: index },
              elem.children
            );
          }) : null
        )
      )
    );
  } else {
    return null;
  }
}

function TableFooter(props) {
  if (props.config.show_info == true || props.config.show_pagination == true) {
    return _react2.default.createElement(
      'div',
      { className: 'row table-foot asrt-table-foot', id: props.id ? props.id + "-table-foot" : "" },
      _react2.default.createElement(
        'div',
        { className: 'col-md-6' },
        props.config.show_info ? props.paginationInfo : null
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-6 pull-right text-right' },
        props.config.show_pagination ? _react2.default.createElement(
          'nav',
          { 'aria-label': 'Page navigation', className: 'pull-right' },
          _react2.default.createElement(
            'ul',
            { className: 'pagination justify-content-end asrt-pagination' },
            props.config.show_first ? _react2.default.createElement(
              'li',
              { className: (props.isFirst ? "disabled " : "") + "page-item" },
              _react2.default.createElement(
                'a',
                { href: '#', className: 'page-link', tabIndex: '-1',
                  onClick: props.firstPage },
                props.config.language.pagination.first
              )
            ) : null,
            _react2.default.createElement(
              'li',
              { className: (props.isFirst ? "disabled " : "") + "page-item" },
              _react2.default.createElement(
                'a',
                { href: '#', className: 'page-link', tabIndex: '-1',
                  onClick: props.previousPage },
                props.config.language.pagination.previous
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'page-item' },
              _react2.default.createElement(
                'a',
                { className: 'page-link' },
                props.page_number
              )
            ),
            _react2.default.createElement(
              'li',
              { className: (props.isLast ? "disabled " : "") + "page-item" },
              _react2.default.createElement(
                'a',
                { href: '#', className: 'page-link',
                  onClick: props.nextPage },
                props.config.language.pagination.next
              )
            ),
            props.config.show_last ? _react2.default.createElement(
              'li',
              { className: (props.isLast ? "disabled " : "") + "page-item" },
              _react2.default.createElement(
                'a',
                { href: '#', className: 'page-link', tabIndex: '-1',
                  onClick: props.lastPage },
                props.config.language.pagination.last
              )
            ) : null
          )
        ) : null
      )
    );
  } else {
    return null;
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