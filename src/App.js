import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpRestaurants: [],
      mealpalRestaurants: [
        {name: 'Chipotle', address: '126 New Montgomery, San Francisco, CA'},
        {name: 'Buckhorn Grill', address: '845 Market St, San Francisco, CA'},
        {name: 'Flying Falafel', address: '1051 Market St., San Francisco, CA'},
        {name: 'Tokyo Express', address: '814 Mission St., San Francisco, CA'},
        {name: 'The Organic Coup', address: '224 Kearny St., San Francisco, CA'},
        {name: 'Kaisen Sushi', address: '71 5th St., San Francisco, CA'}
      ]
    }
  }

  componentDidMount() {
    // for final version, set this.state.mealpalRestaurants = []; 
    // then use webcrawler to grab restaurants from mealpal listings page
    // make sure to cut anything after the dash, because yelp will get confused and give you worse responses
      // e.g. `Tokyo Express- Moscone Center` returns Samovar Tea Lounge. 
      // But `Tokyo Express` returns Tokyo Express
    // then push restaurants into array


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
  }


  render() {
    // Update star rendering to: https://www.yelp.com/developers/display_requirements

    // I'm worried about performing an expensive sorting operation on the client side
    // but I'll do it for an MVP implementation
    // Ask Danny for advice moving forward
    var restaurants = [...this.state.yelpRestaurants];
    restaurants.sort((a,b) => {
      if (a.name < b.name) {
        return -1;
      }
      else {
        return 1;
      }
    });
    const restaurantListings = restaurants.map(({name, rating, url}, index) =>
    <li key={index}><a href={url} target="_blank">{name}</a> {rating} stars</li>
  );

  // to do: refactor so that restaurants show up in the order they are shown on the 
  // mealpal listings page.
  // Implementation hypothesis:
    // - change yelpRestaurants from an array to an object, where the keys are restaurant names
    // - map the mealpalRestaurants array (which is in the correct order) to divs, grabbing
      // relevant data from yelpRestaurants with restaurant name'
  // this.state.mealpalRestaurants.map(({name}, index) => 
  //   <li key={index}><a href={url} target="_blank">{name}</a> {rating} stars</li>
  // )

    // const restaurantListings = this.state.yelpRestaurants.map(({name, rating, url}, index) =>
    //   <li key={index}><a href={url} target="_blank">{name}</a> {rating} stars</li>
    // );
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
