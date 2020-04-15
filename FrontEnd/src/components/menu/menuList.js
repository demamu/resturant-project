import React, { Component } from 'react';
import MenuModel from '../../models/menuModel';
import './menu.css';
import Menu from './menu';
export default class MenuList extends Component {
  state = {
    menuList: [],
    review: false,
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

    menuListView = this.state.menuList.map((menu) => <Menu menu={menu} key={menu._id} />);

    return <div className="menu-list">{menuListView}</div>;
  }
}
