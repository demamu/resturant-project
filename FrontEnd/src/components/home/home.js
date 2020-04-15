import React, { Component } from 'react';
import AdminForm from '../admin/admin';

export default class Home extends Component {

    state = {
        user: {loggedIn: true, role: 'admin'}
    }

    render() {
        
        return (
            <div>
               <AdminForm/>
            </div>
        )
    }
}
