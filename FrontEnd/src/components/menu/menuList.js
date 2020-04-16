import React, { Component } from 'react';
import MenuModel from '../../models/menuModel';
import './menu.css';
import Menu from './menu';


export default class MenuList extends Component {
  state = {
    review: false,
  };

  // async componentDidMount() {
  //   let fetchedMenu = await MenuModel.getAll();
  //   console.log(fetchedMenu);

  //   this.setState({
  //     menuList: fetchedMenu,
  //   });
  // }

  render() {
    let menuListView = '';
console.log(this.props)
    menuListView = this.props.menuList.map((m) => (
      <Menu menuList={this.state.menuList} menu={m} key={m._id} />
    ));

    return <div className="menu-list">{menuListView}</div>;
  }
}
