import React, { Component } from 'react';
import MenuForm from '../menu/menuForm';

export default class Home extends Component {

    state = {
        user: {loggedIn: true, role: 'admin'}
    }

    render() {
        
        return (
            <div>
               <MenuForm/>
            </div>
        )
    }
}
