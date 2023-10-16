# react-datatable

[![npm version](https://img.shields.io/npm/v/@ashvin27/react-datatable.svg)](https://www.npmjs.com/package/@ashvin27/react-datatable)
[![Known Vulnerabilities](https://snyk.io/test/github/ashvin27/react-datatable/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ashvin27/react-datatable?targetFile=package.json)

ReactDatatable is a component which provide ability to create multifunctional table using single component like jQuery Datatable. It's fully customizable and easy to integrate in any react component. Bootstrap compatible.

## Features
* Lightweight
* Fully customizable (JSX, templates, state, styles, callbacks)
* Client-side & Server Side Pagination
* Multi-sort
* Filters
* Minimal design
* Fully controllable via optional props and callbacks

## Example
[http://react-datatable.in/](http://react-datatable.in/)

## Installation
With [npm](https://npmjs.org/) installed, run
```
npm i @ashvin27/react-datatable
```

## Usage

```js
import React, { Component, Fragment } from 'react';
import { render} from 'react-dom';
import ReactDatatable from '@ashvin27/react-datatable';

class App extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                key: "name",
                text: "Name",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "address",
                text: "Address",
                className: "address",
                align: "left",
                sortable: true
            },
            {
                key: "postcode",
                text: "Postcode",
                className: "postcode",
                sortable: true
            },
            {
                key: "rating",
                text: "Rating",
                className: "rating",
                align: "left",
                sortable: true
            },
            {
                key: "type_of_food",
                text: "Type of Food",
                className: "type_of_food",
                sortable: true,
                align: "left"
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            button: {
                excel: true,
                print: true,
                extra: true,
            }
        }
        
        this.state = {
            records: [
              {
                "id": "55f14312c7447c3da7051b26",
                "address": "228 City Road",
                "name": ".CN Chinese",
                "postcode": "3JH",
                "rating": 5,
                "type_of_food": "Chinese"
              },
              {
                "id": "55f14312c7447c3da7051b27",
                "address": "376 Rayleigh Road",
                "name": "@ Thai",
                "postcode": "5PT",
                "rating": 5.5,
                "type_of_food": "Thai"
              },
              {
                "id": "55f14312c7447c3da7051b28",
                "address": "30 Greyhound Road Hammersmith",
                "name": "@ Thai Restaurant",
                "postcode": "8NX",
                "rating": 4.5,
                "type_of_food": "Thai"
              },
              {
                "id": "55f14312c7447c3da7051b29",
                "address": "30 Greyhound Road Hammersmith",
                "name": "@ Thai Restaurant",
                "postcode": "8NX",
                "rating": 4.5,
                "type_of_food": "Thai"
              }
            ]
        }
        this.extraButtons =[
            {
                className:"btn btn-primary buttons-pdf",
                title:"Export TEst",
                children:[
                    <span>
                    <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
                    </span>
                ],
                onClick:(event)=>{
                    console.log(event);
                },
            },
            {
                className:"btn btn-primary buttons-pdf",
                title:"Export TEst",
                children:[
                    <span>
                    <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
                    </span>
                ],
                onClick:(event)=>{
                    console.log(event);
                },
                onDoubleClick:(event)=>{
                    console.log("doubleClick")
                }
            },
        ]
    }

    editRecord(record) {
        console.log("Edit Record", record);
    }

    deleteRecord(record) {
        console.log("Delete Record", record);
    }

    render() {
        return (
            <div>
                <ReactDatatable
                    config={this.config}
                    records={this.state.records}
                    columns={this.columns}
                    extraButtons={this.extraButtons}
                />
            </div>
        )
    }
}

render(<App />, document.getElementById("app"));
```

# API

```js
import ReactDatatable from '@ashvin27/react-datatable';
or
var ReactDatatable = require('@ashvin27/react-datatable')
```
## Props
| Name  | Type | Description
| ------------- | ------------- | ------------- |
| className  | String  | Datatable additional class, use to appy additional styling on table
| tHeadClassName | String | Additional class to be put on the "thead"  of the table
| columns  | Object[]  | This props will used to specify datatable column configuration
| config  | Object[]  | This props will used to specify datatable configuration
| dynamic |  boolean |  This props will used to specify the table data will be server side or static
| id  | String  | Identifier of datatable
| records  | Object[]  | This props will used to table records
| total_record | Number | This props will used to specify the total records in case of table data is server side.
| onChange | Function(Object) | This method will call on table actions(page change, sorting, filtering, page length change)
| onRowClicked | Function(Object) | This method will call when user click on a row, return row object.
| extraButtons | Object[] | This props will add custom extra buttons to the table tools in the top right of the table header next to the built in export buttons
| onSort | function(String, Object[], String) | This props will allow you to sort your data/records using any custom sort function. Or according to you if you don't want to use default sort function provided by the Library.
| loading | Boolean(default false) | This props will allow you to display a loading in table while data is fetching from the server.

## Options
| Name  | Type | default | Description
| ------------- | ------------- | ------------- | ------------- |
| key_column | string | id | Use to specify the key column name for each record
| button  | Object[]  | { excel: false, print: false, csv: false } | Use to enable/disable export buttons(Excel, CSV, Print). By default buttons are disabled.
| filename  | String  | "table" | Specify the export filename
| length_menu  | Array[]  | [10, 25, 50, 75, 100]  | Specify the options in the page length `select` list.
| page_size  | Number  | 10  | Specify the page length (number of rows per page)
| sort  | Object[]  | { column: "", order: "asc" } | Initial sorting order to apply to the datatable
| show_filter | boolean | true | Use to specify either show or hide filter option
| show_first | boolean | true | Use to specify either show or hide pagination first button
| show_info | boolean | true |  Use to specify either show or hide pagination info
| show_last | boolean | true | Use to specify either show or hide pagination last button
| show_length_menu | boolean | true | Use to specify either show or hide page length menu
| show_pagination | boolean | true | Use to specify either show or hide pagination
| pagination | string | basic | Use to specify the type of pagination. Available types: basic/advance

## Columns
| Name  | Type | default | Description
| ------------- | ------------- | ------------- | ------------- |
| align  | String  |  left | Specify the content alignment
| className  | String  |   | Table column additional class fo styling (only for data columns use TrOnlyClassName for headers)
| TrOnlyClassName | String |  | Header column additional class ( only for headers ) WILL NOT automatically take className value if not set
| key  | String  |   | Specify the key of record which value will display in table cell
| sortable  | Boolean  |  false | Specify the column is sortable of not
| text  | String  |   | Specify the table column text
| width  | Number  |   | Specify the column width
| cell  | Function(record, index):string  |   | You can use any react component or JSX to display content in cells
