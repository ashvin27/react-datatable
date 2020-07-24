import React, { Component, Fragment } from 'react';
// import ReactDatatable from '../../lib/index.js';
import ReactDatatable from '../../src/index.js';
import users from '../data/data.json';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: []
        };

        this.deleteUser = this.deleteUser.bind(this);
        this.columns = [
            {
                key: "name",
                text: "Name",
                className: "name",
                TrOnlyClassName:"aClass",
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
                sortable: true,
                cell: record => {
                    return <span>{record.rating} {record.type_of_food}</span>
                }
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
                                onClick={() => this.editUser(record)}
                                style={{marginRight: '5px'}}>
                                <i className="glyphicon glyphicon-edit fa fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => this.deleteUser(record)}>
                                <i className="glyphicon glyphicon-trash fa fa-trash"></i>
                            </button>
                            
                        </Fragment>
                    );
                }
            }
        ];
        this.config = {
            key_column: '_id', 
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Users",
            no_data_text: 'No data available!',
            button: {
                excel: true,
                print: true,
                csv: true,
                extra: false,
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: <span>&#9668;</span>,
                    next: <span>&#9658;</span>,
                    last: "Last"
                }
            },
            pagination: "advance", //advance
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

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

    componentDidMount () {
        setTimeout(() => {
            this.setState({
                loading: false,
                users: users
            })
        }, 3000);
    }

    editUser(user) {
        console.log("Edit User", user);
    }

    deleteUser(user) {
        console.log("Delete User", user);
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    customSort(column, records, sortOrder) {
        console.log("column: %s, records: %O, sortOrder: %s", column, records, sortOrder);

        return records;
    }

    render() {
        return (
            <div>
                <ReactDatatable
                    className="table table-bordered table-striped custom-class"
                    config={this.config}
                    records={this.state.users}
                    columns={this.columns}
                    onPageChange={this.pageChange.bind(this)}
                    extraButtons={this.extraButtons}
                    loading={this.state.loading}
                    onSort={this.customSort}
                />
            </div>
        )
    }
}
export default UserList;
