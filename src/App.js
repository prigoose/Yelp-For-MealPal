import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpRestaurants: [
        {name: 'The Melt', rating: 3.5, url: 'https://www.yelp.com/biz/the-melt-san-francisco-9?osq=the+melt'},
        {name: 'Farmerbrown', rating: 3.5, url: 'https://www.yelp.com/biz/farmerbrown-san-francisco-2'}
      ],
      mealpalRestaurants: [
        {name: 'Chipotle', address: '126 New Montgomery, San Francisco, CA'},
        {name: 'Buckhorn Grill', address: '845 Market St, San Francisco, CA'}
      ]
    }
  }

  componentDidMount() {
    // for final version, set this.state.mealpalRestaurants = []; 
    // then use webcrawler to grab restaurants from mealpal listings page
    // then push restaurants into array

    // now make get request calls to get the ratings for each restaurant

    // for each restaurant in mealPalRestaurants array 
    const newYelpRestaurants = [];

    // In order to move quickly, I'm saving the value of 
    // `this` with a variable called `thisCheat`
    // Refactor later
    const thisCheat = this;

    this.state.mealpalRestaurants.forEach(restaurant => {
      axios.get('http://localhost:3002/rating', {
        params: {
          term: restaurant.name,
          location: restaurant.address
        }
      })
      .then(function (response) {
        console.log('response.data type is: ', typeof response.data)
        newYelpRestaurants.push(response.data);
        thisCheat.setState({
          yelpRestaurants: newYelpRestaurants
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    })

    // console.log('newYelpRestaurants :', newYelpRestaurants);
    // var test = [{name: 'test', rating: 2, url: 'google.com'}]
    // console.log('typeof test: ', typeof test);
    // this.setState({
    //   yelpRestaurants: test
    // });
    // console.log('this.state.yelpRestaurants: ', this.state.yelpRestaurants);
  }


  render() {
    // Update star rendering to: https://www.yelp.com/developers/display_requirements
    const restaurantListings = this.state.yelpRestaurants.map(({name, rating, url}, index) =>
      <li key={index}><a href={url} target="_blank">{name}</a> {rating} stars</li>
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
