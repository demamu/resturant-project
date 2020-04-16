import React, { Component } from 'react';
import AdminForm from '../admin/admin';
import MenuList from '../menu/menuList';
import MenuModel from '../../models/menuModel';
import Register from '../user/register';
import Login from '../user/login';
import User from '../../models/user';
import axios from 'axios';
import './home.css';

export default class Home extends Component {
  state = {
    menuList: [],
    review: false,
    loggedUser: null,
    user: { name: '', email: '', password: '' },
    showLogin: false,
    showRegister: false,
    showMenu: true,
    userLoggedIn: false,
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
      loggedUser: response.data.user,
      showRegister: false
    });

    console.log(this.state.loggedUser);
  };

  onLoginClick = () => {
    this.setState({
      showLogin: true,
      showMenu: false,
      showRegister: false,
    });
  };
  onUserLogin = () => {
    this.setState({
      showLogin: false,
      showMenu: false,
      showRegister: false,
      userLoggedIn: true,
    });
  };

  onLogoutClick = () => {
    this.setState({
      showLogin: false,
      showMenu: true,
      showRegister: false,
      userLoggedIn: false,
    });
  };
  onRegisterClick = () => {
    this.setState({
      showLogin: false,
      showMenu: false,
      showRegister: true,
    });
  };
  onMenuClick = () => {

    this.setState({
      showLogin: false,
      showMenu: true,
      showRegister: false,
      
    });
  };

  async componentDidMount() {
    let fetchedMenu = await MenuModel.getAll();
    console.log(fetchedMenu);

    this.setState({
      menuList: fetchedMenu,
    });

    console.log(this.state);
  }

  render() {
    let homeView = '';
    // if the user is not an admin
    let loggedInUser = this.state.loggedUser;

    if(loggedInUser && loggedInUser.name==='admin'){
        loggedInUser.role = 'admin';
    }
    if(loggedInUser && loggedInUser.name==='user'){
        loggedInUser.role = 'user';
    }
    
    console.log('prpps: ', this.props);

    if (this.state.userLoggedIn && loggedInUser.role === 'user') {
      // show user view
      homeView = <MenuList menuList={this.state.menuList} />;
    } else if (this.state.showLogin) {
      // show login form
      homeView = (
        <Login user={this.state.user} loggedUser={this.state.loggedUser} />
      );
    } else if (this.state.showRegister) {
      // show rgister form
      homeView = (
        <Register
          onRegisterInputChange={this.onRegisterInputChange}
          onRegisterFormSubmit={this.onRegisterFormSubmit}
          user={this.state.user}
          loggedUser={this.state.loggedUser}
        />
      );
    } else if (loggedInUser && loggedInUser.role === 'admin') {
      //show admin view
      homeView = <AdminForm />;
    } else {
      // show user view
      homeView = <MenuList menuList={this.state.menuList} />;
    }

    return (
      <div>
        <div className="nav-btns">
          <button
            className="btn btn-primary"
            onClick={() => this.onLoginClick()}
          >
            Login
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.onLogoutClick()}
          >
            Logout
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.onRegisterClick()}
          >
            Register
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.onMenuClick()}
          >
            Menu
          </button>
        </div>
       
        {homeView}
      </div>
    );
  }
}
