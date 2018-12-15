import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { json2excel } from 'js2excel';
import './style.css';
import upArrow from './up-arrow.png';
import downArrow from './down-arrow.png';

let style = {
    table_body: {
        marginTop: '16px'
    },
    table_size: {
        background: 'none',
        border: 'none'
    },
    table_size_dropdown: {
        width: '60px',
        flex: 'none'
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
        backgroundImage: `url(${upArrow})`
    },
    sort_desc: {
        backgroundImage: `url(${downArrow})`
    }
};

class ReactDatatable extends Component {

    constructor(props) {
        super(props);
        this.sortColumn = this.sortColumn.bind(this);
        this.numPages = this.numPages.bind(this);
        this.exportToExcel = this.exportToExcel.bind(this);
        this.exportToPDF = this.exportToPDF.bind(this);
        this.config = {
            filename: (props.config && props.config.filename) ? props.config.filename : "table",
            button: {
                excel: (props.config && props.config.button && props.config.button.excel) ? props.config.button.excel : false,
                print: (props.config && props.config.button && props.config.button.print) ? props.config.button.print : false,
            },
            length_menu: (props.config && props.config.length_menu) ? props.config.length_menu : [10, 25, 50, 75, 100],
            no_data_text: (props.config && props.config.no_data_text) ? props.config.no_data_text : 'No rows found',
        };
        this.state = {
            sort: (props.config && props.config.sort) ? props.config.sort : { column: props.columns[0].key, order: "asc" },
            page_size: (props.config.page_size) ? props.config.page_size : 10,
            page_number: 1,
            filter_value: ""
        };
    }

    filterRecords(e) {
        let value = e.target.value;
        this.setState({
            filter_value: value
        });
    }

    changePageSize(e) {
        let value = e.target.value;
        this.setState({
            page_size: value
        });
    }

    sortColumn(column, sortOrder) {
        if (!column.sortable) return false;
        let newSortOrder = (sortOrder == "asc") ? "desc" : "asc";
        this.setState({
            'sort': { column: column.key, order: newSortOrder }
        });
        // this.props.onSort({ column: column.key, order: newSortOrder });
    }

    paginate(records) {
        let page_size = this.state.page_size;
        let page_number = this.state.page_number;
        --page_number; // because pages logically start with 1, but technically with 0
        return records.slice(page_number * page_size, (page_number + 1) * page_size);
    }

    numPages(records){
        return Math.ceil(records.length / this.state.page_size);
    }

    previousPage() {
        this.setState({
            page_number: this.state.page_number - 1
        });
    }

    nextPage() {
        this.setState({
            page_number: this.state.page_number + 1
        });
    }

    isLast(pages) {
        if (this.state.page_number == pages) {
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

    exportToExcel() {
        let excelData = [];
        for (let i in this.props.records) {
            let record = this.props.records[i],
                newRecord = {};
            for (let column of this.props.columns) {
                newRecord[column.text] = record[column.key];
            }
            excelData.push(newRecord);
        }
        try {
            json2excel({
                excelData,
                name: this.config.filename,
                formateDate: 'yyyy/mm/dd'
            });
        } catch (e) {
            console.error('export error');
        }
    }

    exportToPDF() {
        let sTable = "";
        sTable += "<table>";
        sTable += "<thead>";
        sTable += "<tr>";
        for (let column of this.props.columns) {
            sTable += "<th>" + column.text + "</th>";
        }
        sTable += "</tr>";
        sTable += "</thead>";
        sTable += "<tbody>";
        for (let i in this.props.records) {
            let record = this.props.records[i];
            sTable += "<tr>";
            for (let column of this.props.columns) {
                sTable += "<td>" + record[column.key] + "</td>";
            }
            sTable += "</tr>";
        }
        sTable += "</tbody>";
        sTable += "</table>"

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

    render() {
        let records = _.orderBy(this.props.records, [this.state.sort.column], [this.state.sort.order]),
            filterValue = this.state.filter_value,
            filterRecords = records;
        if (filterValue) {
            filterRecords = records.filter((record) => {
                let allow = false;
                _.each(this.props.columns, (column, key) => {
                    if (record[column.key]) {
                        allow = _.includes(record[column.key].toString(), filterValue.toString()) ? true : allow;
                    }
                });
                return allow;
            });
        }
        let totalRecords = filterRecords.length,
            pages = this.numPages(filterRecords),
            isFirst = this.isFirst(pages),
            isLast = this.isLast(pages);
        filterRecords = this.paginate(filterRecords);
        let startRecords = (this.state.page_number * this.state.page_size) - (this.state.page_size - 1);
        let endRecords = this.state.page_size * this.state.page_number;
        endRecords = (endRecords > totalRecords) ? totalRecords : endRecords;

        return (
            <Fragment>
                <div className="row table-head">
                    <div className="col-md-6">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={style.table_size}>Show</span>
                            </div>
                            <select type="text" className="form-control" style={style.table_size_dropdown}
                                onChange={this.changePageSize.bind(this)}>
                                {
                                    this.config.length_menu.map((value, key) => { 
                                        return (<option key={value}>{value}</option>);
                                    })
                                }
                                <option value={this.props.records.length}>All</option>
                            </select>
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={style.table_size}>records per page</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 float-right text-right">
                        <div className="table_filter" style={style.table_filter}>
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search in records..."
                                onChange={this.filterRecords.bind(this)}/>
                        </div>
                        <div className="table_tools" style={style.table_tool}>
                            {(this.config.button.excel) ? (
                                <button className="btn btn-primary buttons-excel"
                                    tabIndex="0"
                                    aria-controls="configuration_tbl"
                                    title="Export to Excel"
                                    style={style.table_tool_btn}
                                    onClick={this.exportToExcel}>
                                    <span>
                                    <i className="fa fa-file-excel" aria-hidden="true"></i>
                                    </span>
                                </button>
                            ) : null}
                            {(this.config.button.print) ? (
                                <button className="btn btn-primary buttons-pdf"
                                    tabIndex="0"
                                    aria-controls="configuration_tbl"
                                    title="Export to PDF"
                                    style={style.table_tool_btn}
                                    onClick={this.exportToPDF}>
                                    <span>
                                    <i className="fa fa-print" aria-hidden="true"></i>
                                    </span>
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="row table-body" style={style.table_body}>
                    <div className="col-md-12">
                        <table className="table table-bordere table-striped">
                            <thead>
                                <tr>
                                    {
                                        this.props.columns.map((column, index) => {
                                            let classText = (column.sortable) ? "sortable " : "",
                                                width = (column.width) ? column.width : "",
                                                align = (column.align) ? column.align : "",
                                                sortOrder = "",
                                                columnStyle = {};
                                            if (this.state.sort.column == column.key) {
                                                sortOrder = this.state.sort.order;
                                                classText += (sortOrder) ? " " + sortOrder : "";
                                                columnStyle = (sortOrder == "asc") ? style.sort_asc : style.sort_desc;
                                            }

                                            classText += " text-" + align;
                                            if(column.className)
                                                classText += " " + column.className;
                                                
                                            return (<th
                                                key={column.text}
                                                className={classText}
                                                width={width}
                                                style={columnStyle}
                                                onClick={() => this.sortColumn(column, sortOrder)}>
                                                {column.text}
                                            </th>);
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {(filterRecords.length) ? filterRecords.map(record => {
                                    return (
                                        <tr key={record._id}>
                                            {
                                                this.props.columns.map((column, index) => {
                                                    if (column.cell && typeof column.cell === "function") {
                                                        return (<td key={column.key}>{column.cell(record)}</td>);
                                                    }else if (record[column.key]) {
                                                        return (<td key={column.key}>
                                                            {record[column.key]}
                                                        </td>);
                                                    }
                                                })
                                            }
                                        </tr>
                                    )
                                }) : (<tr>
                                        <td colSpan={this.props.columns.length} align="center">
                                            {this.config.no_data_text}
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row table-foot">
                    <div className="col-md-6">
                        Showing {(this.state.page_number == 1) ? 1: startRecords} to {endRecords} of {totalRecords} entries
                    </div>
                    <div className="col-md-6">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                <li className={(isFirst ? "disabled " : "") + "page-item"}>
                                    <button className="page-link" tabIndex="-1"
                                        onClick={this.previousPage.bind(this)}>
                                        Previous
                                    </button>
                                </li>
                                <li className="page-item">
                                    <a className="page-link">{this.state.page_number}</a>
                                </li>
                                <li className={(isLast ? "disabled " : "") + "page-item"}>
                                    <button className="page-link"
                                        onClick={this.nextPage.bind(this)}>
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Fragment>
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
	"config": {
		"filename": "table",
		"button": {
            "excel": false,
            "print": false,
        },
        "length_menu": [10, 25, 50, 75, 100],
        "no_data_text": "No rows found",
        "sort": { 
        	"column": "test", 
        	"order": "asc" 
        },
        "page_size": 10
	},
	"records": [],
	"columns": []
}

export default ReactDatatable;