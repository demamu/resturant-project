import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';
import Login from './components/user/login';
import Register from './components/user/register';
import Home from './components/home/home';
import MenuList from './components/menu/menuList';
import Admin from './components/admin/admin';
import User from './models/user';
import axios from 'axios';
import Menu from './components/menu/menu';
import Main from './components/home/main';

class App extends React.Component {

  render(){
    return (
      <Router>
        <Main />
      </Router>
    )

  }
  
}

export default App;
