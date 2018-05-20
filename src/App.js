'use strict';
import React, { Component } from 'react';
import './App.css';
import { apiKey } from './apiKey.js';

const yelp = require('yelp-fusion');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpRestaurants: [
        {restaurant: 'The Melt', rating: 3.5, url: 'https://www.yelp.com/biz/the-melt-san-francisco-9?osq=the+melt'},
        {restaurant: 'Farmerbrown', rating: 3.5, url: 'https://www.yelp.com/biz/farmerbrown-san-francisco-2'}
      ]
    }
  }

  componentDidMount() {
    var mealpalRestaurants = [
      {restaurant: 'The Melt', address: '925 Market St. , San Francisco, CA'},
      {restaurant: 'Fresh Roll', address: '157 4th St., San Francisco, CA '}
    ];
    // for final version, start with an empty mealpalRestaurants array and push in restaurants that I find on page
  }


  render() {
    const restaurantListings = this.state.restaurants.map(({restaurant, rating, url}, index) =>
      <li key={index}><a href={url} target="_blank">{restaurant}</a> {rating} stars</li>
    );
    return (
      <div className="App">
        <p className="Restaurant-listings">
          {restaurantListings}
        </p>
      </div>
    );
  }
}

export default App;
