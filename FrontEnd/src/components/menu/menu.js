import React, { Component } from 'react'


export default class Menu extends Component {
    state = {

        review: false,
      };
      

      onReviewBtnClick = () => {
        this.setState({
          review: !this.state.review,
        });
      };


    render() {
        let reviewForm = '';
        if (this.state.review) {
          reviewForm = (
            <form onSubmit="onReviewSubmit">
              <textarea placeholder="your comment" />
              <button className="btn btn-secondary" type="submit">Add</button>
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
            {reviewForm}
          </div>
        )
    }
}
