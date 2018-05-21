import React, { Component } from 'react';
import './App.css';

const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpRestaurants: [
        {name: 'The Melt', rating: 3.5, url: 'https://www.yelp.com/biz/the-melt-san-francisco-9?osq=the+melt'},
        {name: 'Farmerbrown', rating: 3.5, url: 'https://www.yelp.com/biz/farmerbrown-san-francisco-2'}
      ]
    }
  }

  componentDidMount() {
    var mealpalRestaurants = [
      {name: 'Chipotle', address: '126 New Montgomery, San Francisco, CA'},
      {name: 'Buckhorn Grill', address: '845 Market St, San Francisco, CA'}
    ];
    // for final version, start with an empty mealpalRestaurants array and push in restaurants that I find on page
    // MUST MOVE GET REQUEST INTO SERVER
    // YOUTUBE API DOES NOT CURRENTLY SUPPORT CLIENT-SIDE DATA REQUESTS

  }


  render() {
    // Update star rendering to: https://www.yelp.com/developers/display_requirements
    const restaurantListings = this.state.yelpRestaurants.map(({restaurant, rating, url}, index) =>
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
