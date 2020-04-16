import React, { Component } from 'react';
import MenuModel from '../../models/menuModel';

export default class Menu extends Component {
  state = {
    menu : this.props.menu,
    menuReview: '',
    menuRating: 5,
    showReview: false,
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
      showReview: !this.state.showReview,
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
      showReview: !this.state.showReview,
    });

  };

  onAddBtnClick = async (event, menuId) => {
    event.preventDefault();
    console.log(menuId)

    let foundMenu = await MenuModel.getById(menuId);
    console.log("foundMenu..........", foundMenu);
    console.log(this.props);

    foundMenu.reviews.push(this.state.menuReview);
    foundMenu.ratings.push( this.state.menuRating);
    
    let response = await MenuModel.update(menuId, foundMenu);
    console.log("response, ", response)


    this.setState({
      showReview: !this.state.showReview,
      menu: response
    });

  }

  componentDidUpdate(){
    console.log(this.state)
  }

  render() {
    let prevReview = '';
    let reviewForm = '';
    let avgRating = 0;
    let ratings = this.state.menu.ratings;
        
    if(ratings.length > 0){
      let totalRating = ratings.reduce((item, accumulator) => (accumulator + Number(item)))
      avgRating = totalRating/ratings.length;
    }

    if (this.state.showReview) {     
        prevReview = this.state.menu.reviews.map((rev,index) => <div className='review' key={index}>
          <p>Review: <small>{rev}</small></p>
          <p>Rating: <strong>{avgRating.toFixed(1)}</strong></p>

        </div>);
      

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

          <button className="btn btn-secondary" onClick={(event) => this.onAddBtnClick(event, this.state.menu._id)} >Add</button>
        </form>
      );
    }
    return (
      <div key={this.state.menu._id} className="menu-item card">
        <img src={this.state.menu.imgUrl} />
        <h4>{this.state.menu.name}</h4>
        <h4>Price: ${this.state.menu.price}</h4>
        <h4>Calories: {this.state.menu.calories} cal</h4>
        <h4>Rating: {avgRating.toFixed(1)}</h4>
        <button className="btn btn-primary" onClick={() => this.onReviewBtnClick()}>Review</button>

        {prevReview}
        {reviewForm}
      </div>
    )
  }
}
