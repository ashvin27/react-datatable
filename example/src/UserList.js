import React, { Component, Fragment } from 'react';
import ReactDatatable from '../../lib/index.js';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
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
                                className="tblActionBtn action-icon btn btn-primary btn-sm"
                                onClick={() => this.editUser(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button className="tblActionBtn action-icon btn btn-danger btn-sm" onClick={() => this.deleteUser(record)}>
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
            filename: "Users",
            no_data_text: 'No data available!',
            button: {
                excel: true,
                print: true
            }
        }
    }

    editUser(user) {
        console.log("Edit User", user);
    }

    deleteUser(user) {
        console.log("Delete User", user);
    }

    render() {
        return (
            <div>
                <ReactDatatable
                    config={this.config}
                    records={this.props.users}
                    columns={this.columns}
                />
            </div>
        )
    }
}
export default UserList;