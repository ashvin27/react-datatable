import React, { Component } from 'react';
import UserList from './UserList.js';
import users from '../data/data.json'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: users
        };
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <div className="container">
                <h2>Restaurants:</h2>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}
export default Users;