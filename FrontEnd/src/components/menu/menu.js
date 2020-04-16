import React, { Component } from 'react';
import MenuModel from '../../models/menuModel';

export default class Menu extends Component {
  state = {
    menuReview: '',
    review: false,
  };

  onInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  onReviewBtnClick = (event) => {
    this.setState({
      review: !this.state.review,
    });
  };
  onAddBtnClick = async (event, menuId) => {
    event.preventDefault();

    let foundMenu = await MenuModel.getById(menuId);
    foundMenu.review = this.state.menuReview;
    let response = await MenuModel.update(menuId, foundMenu);
    console.log(response);

    alert('success');
    this.setState({
      review: !this.state.review,
    });
  };

  render() {
    let reviewForm = '';
    if (this.state.review) {
      reviewForm = (
        <form>
          <textarea
            placeholder="your comment"
            value={this.state.reviewInput}
            name="menuReview"
            onChange={(event) => this.onInputChange(event)}
          />
          <button
            className="btn btn-secondary"
            onClick={(event) => this.onAddBtnClick(event, this.props.menu._id)}
          >
            Add
          </button>
        </form>
      );
    }
    return (
      <div key={this.props.menu._id} className="menu-item card">
        <img src={this.props.menu.imgUrl} />
        <h4>{this.props.menu.name}</h4>
        <h4>Price: ${this.props.menu.price}</h4>
        <h4>Calories: {this.props.menu.calories} cal</h4>
        <h4>Reviews: {this.props.menu.reviews}</h4>
        <h4>Rating: {this.props.menu.rating}</h4>
        <button
          className="btn btn-primary"
          onClick={() => this.onReviewBtnClick()}
        >
          Review
        </button>
        {reviewForm}
      </div>
    );
  }
}
