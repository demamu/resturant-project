import React, { Component } from 'react';
import Nav from '../nav/nav';
import Register from '../user/register';
import Login from '../user/login';

export default class Main extends Component {

    state = {
        user: {loggedIn: true, role: 'admin'}
    }

    render() {
        let mainView = '';
        if(this.state.user.loggedIn && this.state.role === 'admin'){
            mainView = <div>
                <h1>Admin View</h1>
                <div>Menus.....</div>
            </div>
        }else if(this.state.user.loggedIn && this.state.role !== 'admin'){
            mainView = <div>
                <h1>Logged in user  View</h1>

            </div>
        }else {
            mainView = <div>
                <h1>Guest View</h1>
                <Register/>
                <Login/>
            </div>
        }
        return (
            <div>
                <Nav/>
                <h1>Main Component</h1>
                {mainView}
            </div>
        )
    }
}
