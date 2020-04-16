import React, { Component } from 'react';
import Register from '../user/register';
import Login from '../user/login';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';
import Home from '../../components/home/home';
import MenuList from '../../components/menu/menuList';
import Admin from '../../components/admin/admin';
import User from '../../models/user';
import axios from 'axios';
import Menu from '../../components/menu/menu';


export default class Main extends Component {

    state = {
        loggedUser: null,
        user: { name: '', email: '', password: '' },
      };
    
      onRegisterInputChange = (event) => {
        console.log(event.target);
        let name = event.target.name;
        let value = event.target.value;
    
        let userCopy = { ...this.state.user };
        userCopy[name] = value;
        this.setState({
          user: userCopy,
        });
      };
    
      onRegisterFormSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target);
        let user = this.state.user;
        let newUser = new User(user.name, user.email, user.password);
        console.log(newUser);
    
        let uri = axios.defaults.baseURL + '/users';
        let response = await axios.post(uri, newUser);
        console.log(response.data);
    
        let userReset = { name: '', email: '', password: '' };
        this.setState({
          user: userReset,
          loggedUser: response.data.user
        });
      };
    
    
    
      render() {
        return (
          <div className="App container">
            {/* <Main/> */}
            <Router>
                      <div>
                <div className="navbar bg-primary">
                  <NavLink to="/admin" activeStyle={{ color: 'green' }}>
                    Admin
                  </NavLink>
                  <NavLink to="/" activeStyle={{ color: 'green' }}>
                    Home
                  </NavLink>
                  <NavLink to="/login" activeStyle={{ color: 'green' }}>
                    LogIn
                  </NavLink>
                  <NavLink to="/register" activeStyle={{ color: 'green' }}>
                    Register
                  </NavLink>
                </div>
                <Switch>
                  <Route path="/admin" exact>
                    <Admin user={this.state.user}
                          loggedUser={this.state.loggedUser} />
                  </Route>
                  <Route path="/" exact >
                    <MenuList user={this.state.user}
                              loggedUser={this.state.loggedUser} />
                  </Route>
                  <Route path="/login" exact >
                    <Login user={this.state.user}
                    loggedUser={this.state.loggedUser} />
                  </Route>
                  <Route path="/register" exact>
                    <Register
    
                      onRegisterInputChange={this.onRegisterInputChange}
                      onRegisterFormSubmit={this.onRegisterFormSubmit}
                      user={this.state.user} 
                      loggedUser={this.state.loggedUser}/>
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        );
      }
}
