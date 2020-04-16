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

    // let fetchedMenu = [new MenuModel(),new MenuModel(),new MenuModel(),new MenuModel()];
    this.setState({
      menuList: fetchedMenu,
    });
  }

  render() {
    let menuListView = '';

    menuListView = this.state.menuList.map(m => <Menu menuList={this.state.menuList} menu={m} key={m._id} />);

    return <div className="menu-list">{menuListView}</div>;
  }
}
