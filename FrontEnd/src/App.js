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
import User from './models/user';
import axios from 'axios';



class App extends React.Component {
state ={
  user: {name: '', email: '', password:''}
}


  onRegisterInputChange = (event) => {
    console.log(event.target);
    let name = event.target.name;
    let value = event.target.value;

    let userCopy = {...this.state.user};
    userCopy[name] =value;
    this.setState({
      user: userCopy
    })
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

  }

  render() {
    return (
      <div className="App container">
        {/* <Main/> */}
        <Router>
          <div>
            <div className="navbar bg-primary">
              <NavLink to="/home" activeStyle={{ color: 'green' }}>
                Home
              </NavLink>
              <NavLink to="/menu" activeStyle={{ color: 'green' }}>
                Menu
              </NavLink>
              <NavLink to="/login" activeStyle={{ color: 'green' }}>
                LogIn
              </NavLink>
              <NavLink to="/logout" activeStyle={{ color: 'green' }}>
                Logout
              </NavLink>
              <NavLink to="/register" activeStyle={{ color: 'green' }}>
                Register
              </NavLink>
            </div>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/menu" exact component={MenuList} />
              <Route path="/login" exact component={Login} />
              <Route path="/logout" exact component={Home} />
              <Route path="/register" exact>
                <Register onRegisterInputChange={this.onRegisterInputChange}
                onRegisterFormSubmit={this.onRegisterFormSubmit} user={this.state.user} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
