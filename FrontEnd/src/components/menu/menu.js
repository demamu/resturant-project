import React, { Component } from 'react';
import MenuModel from '../../models/menuModel';

export default class Menu extends Component {
  state = {
    menuReview: '',
    menuRating: 5,
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


  onInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  onReviewBtnClick = (event) => {
    this.setState({
      review: !this.state.review,
    });

  };

  onAddBtnClick = async (event, menuId) => {
    event.preventDefault();
    console.log(menuId)
    let foundMenu = await MenuModel.getById(menuId);
    console.log(foundMenu);
    console.log(this.props);

    // let foundMenu = this.props.menuList.findIndex(m => m._id === menuId);
    // if (foundMenu !== -1) {
    //   this.props.menuList[foundMenu].review.push(this.state.menuReview);

    //   this.props.menuList[foundMenu].rating = this.state.menuRating;
    // }


    foundMenu.reviews.push(this.state.menuReview);
    foundMenu.ratings.push( this.state.menuRating);
    let response = await MenuModel.update(menuId, foundMenu);
    console.log(response)

    this.setState({
      review: !this.state.review,
    });

  }

  render() {
    let prevReview = '';


    let reviewForm = '';

    if (this.state.review) {
      console.log(this.props)
      if (this.props.menu.review) {
        prevReview = this.props.menu.review.map(rev => <div className='review'>
          <p>Review: <small>{rev}</small></p>
          <p>Rating: <strong>{this.props.menu.rating}</strong></p>

        </div>);
      }

      reviewForm = (
        <form >
          <label>Your review: </label>
          <textarea className="form-control"
            placeholder="your comment" value={this.state.reviewInput} name="menuReview" onChange={(event) => this.onInputChange(event)} />

          <label>Rating: </label>
          <input
            className="form-control"
            type="number" min="1" max="5" value={this.state.menuRating} name="menuRating"
            onChange={(event) => this.onInputChange(event)} />

          <button className="btn btn-secondary" onClick={(event) => this.onAddBtnClick(event, this.props.menu._id)} >Add</button>
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
        <button className="btn btn-primary" onClick={() => this.onReviewBtnClick()}>Review</button>

        {prevReview}
        {reviewForm}
      </div>
    )
  }
}
