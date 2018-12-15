# react-datatable

[![npm version](https://img.shields.io/npm/v/@ashvin27/react-datatable.svg)](https://www.npmjs.com/package/@ashvin27/react-datatable)

ReactDatatable is a component which provide ability to create multifunctional table using single component like jQuery Datatable. It's fully customizable and easy to integrate in any react component. Bootstrap compatible.

## Features
* Lightweight
* Fully customizable (JSX, templates, state, styles, callbacks)
* Client-side & pagination
* Multi-sort
* Filters
* Minimal design
* Fully controllable via optional props and callbacks

## Example
[https://ashvin27.github.io/react-datatable/example/](https://ashvin27.github.io/react-datatable/example/)

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
                print: true
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
| config  | Object[]  | This props will used to specify datatable configuration
| records  | Object[]  | This props will used to pass records/data to datatable
| columns  | Object[]  | This props will used to specify datatable column configuration

## Options
| Name  | Type | default | Description
| ------------- | ------------- | ------------- | ------------- |
| className  | String  |   | Datatable additional class, use to appy additional styling on table
| id  | String  |   | Identifier of datatable
| page_size  | Number  | 10  | Specify the page length (number of rows per page)
| length_menu  | Array[]  | [10, 25, 50, 75, 100]  | Specify the options in the page length `select` list.
| filename  | String  | "table" | Specify the export filename
| button  | Object[]  | { excel: false, print: false } | Use to enable/disable export buttons. By default buttons are disabled.
| sort  | Object[]  | { column: "", order: "asc" } | Initial sorting order to apply to the datatable

## Columns
| Name  | Type | default | Description
| ------------- | ------------- | ------------- | ------------- |
| key  | String  |   | Specify the key of record which value will display in table cell
| text  | String  |   | Spcify the table column text
| className  | String  |   | Table column additional class fo styling
| align  | String  |  left | Specify the content alignment
| width  | Number  |   | Specify the column width
| sortable  | Boolean  |  false | Specify the column is sortable of not
| cell  | Function(record):string  |   | You can use any react component or JSX to display content in cells
