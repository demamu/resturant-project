import React, { Component } from 'react';
import MenuModel from '../../models/menuModel';
//import './menu.css';

export default class Admin extends Component {
  state = {
    menuList: [],
  };

  async componentDidMount() {
    let fetchedMenu = await MenuModel.getAll();
    console.log(fetchedMenu);
    this.setState({
      menuList: fetchedMenu,
    });
  }
  render() {
    let menuListView = '';
    menuListView = this.state.menuList.map((menu, index) => (
      <div key={index} className="menu-item card">
        <img src={menu.imgUrl} />
        <h4>{menu.name}</h4>
        <h4>Price: ${menu.price}</h4>
        <h4>Calories: {menu.calories} cal</h4>
        <h4>Reviews: {menu.reviews}</h4>
        <h4>Rating: {menu.rating}</h4>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    ));

    return <div className="menu-list"> {menuListView}</div>;
  }
}
