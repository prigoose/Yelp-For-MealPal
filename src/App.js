import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
let cheerio = require('cheerio');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpRestaurants: [
        {name: 'Veracio\'s Pizza & Ice Cream', key: 1, rating: 3.5, url: 'https://www.yelp.com/biz/veracios-pizza-san-francisco', review_count: 73},
        {name: 'Steap Tea Bar', key: 2, rating: 4.5, url: 'https://www.yelp.com/biz/steap-tea-bar-san-francisco-3', review_count: 52},
        {name: 'Schilling Cafe', key: 3 ,rating: 3.5, url: 'https://www.yelp.com/biz/schilling-cafe-san-francisco', review_count: 7}
      ],
      mealpalRestaurants: [
        {name: 'Veracio\'s Pizza & Ice Cream', address: '32 6th St.'},
        {name: 'Steap Tea Bar', address: '827 Sacramento St'},
        {name: 'Schilling Cafe', address: '667-669 Commercial St.'},
        {name: 'Battery St. Coffee Roastery', address: '950 Battery St.'},
        {name: 'Frena Bakery', address: '132 6th St.'},
        {name: 'Chaat Corner', address: '138 Cyril Magnin St.'},
        {name: 'New Delhi', address: '160 Ellis St'},
        {name: 'Slice House', address: '680 A Second St.'},
        {name: 'The Melt', address: '925 Market St.'}
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
    // `this` with a variable called `app`
    // Refactor later
    const app = this;

    this.state.mealpalRestaurants.forEach(restaurant => {
      axios.get('http://localhost:3002/rating', {
        params: {
          term: restaurant.name,
          location: restaurant.address
        }
      })
      .then(function (response) {
        if (response.data.name !== undefined) { 
          // if yelp gave me back useful information like the restaurant name
          // then add it to state so we can display to user
          // otherwise, just ignore it
          newYelpRestaurants.push(response.data);
        }
        app.setState({
          yelpRestaurants: newYelpRestaurants
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  }

  renderStars(rating) {
    if (rating === 0) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_0.png" alt="0 stars"></img>
    } else if (rating === .5) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_0_half.png" alt="0.5 stars"></img>
    } else if (rating === 1) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_1.png" alt="1 stars"></img>
    } else if (rating === 1.5) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_1_half.png" alt="1.5 stars"></img>
    } else if (rating === 2) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_2.png" alt="2 stars"></img>
    } else if (rating === 2.5) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_2_half.png" alt="2.5 stars"></img>
    } else if (rating === 3) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_3.png" alt="3 stars"></img>
    } else if (rating === 3.5) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_3_half.png" alt="3.5 stars"></img>
    } else if (rating === 4) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_4.png" alt="4 stars"></img>
    } else if (rating === 4.5) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_4_half.png" alt="4.5 stars"></img>
    } else if (rating === 5) {
      return <img src="https://s3-us-west-1.amazonaws.com/yelpstars/small_5.png" alt="5 stars"></img>
    }
  }

  openYelpPage(url) {
    console.log(url)
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
    const restaurantListings = restaurants.map(({name, rating, url, key, review_count}) =>
      <div className="restaurant" key={key} onClick={()=> window.open(url)}>
        <a href={url} target="_blank">{name}</a> {this.renderStars(rating)} <span>{review_count} reviews </span>
      </div>
    );

    // var query = { active: true, currentWindow: true };

    // var callback = function(tabs) {
    //   var currentTab = tabs[0]; // there will be only one in this array
    //   console.log('current tab is: ', currentTab); // also has properties like currentTab.id
    // }

    // console.log('can I access url outside of addEventListener? Here is a test: ', url)

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
          {restaurantListings}
      </div>
    );
  }
}

export default App;

// {/* <p>
// {/* chrome tabs query is {chrome.tabs.query(query, callback)} */}
// </p> */}