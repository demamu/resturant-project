import React, { Component } from 'react';
import MenuModel from '../../models/menuModel';
import './menu.css';


export default class Menu extends Component {
    state ={
        menuList: []
    }

    async componentDidMount(){
        let fetchedMenu  = await MenuModel.getAll();
        console.log(fetchedMenu);
        this.setState({
            menuList: fetchedMenu
        });
    }
    render() {
        let menu = new MenuModel();
        

        return (
            <div className="menu-list">


                <div className="menu-item card">
                    <img src={menu.imgUrl} />
                    <h4>{menu.name}</h4>
                    <h4>Price: ${menu.price}</h4>
                    <h4>Calories: {menu.calories} cal</h4>
                    <h4>Reviews: {menu.reviews}</h4>
                    <h4>Rating: {menu.rating}</h4>
                </div>
            </div>
        )
    }
}
