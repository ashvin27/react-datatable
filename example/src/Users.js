import React, { Component } from 'react';
import UserList from './UserList.js';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    
    render() {
        return (
            <div className="container">
                <UserList />
            </div>
        )
    }
}
export default Users;