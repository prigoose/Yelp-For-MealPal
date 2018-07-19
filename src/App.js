import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom'
import './App.css';
const cheerio = require('cheerio');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealpalRestaurants: [],
      yelpRestaurants: [],
      sortedRestaurants: [],
      sourceLoaded: false,
      buttons: false
    };
    this.callApi = this.callApi.bind(this);
    this.alphabeticSort = this.alphabeticSort.bind(this);
    // this.numericSort = this.numericSort.bind(this);
    this.ratingSort = this.ratingSort.bind(this);
    this.hardRefresh = this.hardRefresh.bind(this);
    this.isScrapingDone = this.isScrapingDone.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.isScrapingDone(),1000);
  }

  isScrapingDone() {
    if (window.source && this.state.sourceLoaded === false) {
      let $ = cheerio.load(window.source);
      let mealpalRestaurants = [];
      let restaurantNames = [];
      $('div.restaurant div.name').not('.meal').each(function(i, elem) {
        mealpalRestaurants[i] = {'name': $(this).text()};
        // make sure to cut anything after the dash, because yelp will get confused and give you worse responses
        // e.g. `Tokyo Express- Moscone Center` returns Samovar Tea Lounge. 
        // But `Tokyo Express` returns Tokyo Express
        // then push restaurants into array
      });

      let restaurantAddresses = [];
      $('div.restaurant div.address').each(function(i, elem) {
        mealpalRestaurants[i].address = $(this).text();
      });
      console.log('mealpal Restaurants is: ', mealpalRestaurants)
      
      this.setState({
        sourceLoaded: true,
        mealpalRestaurants: mealpalRestaurants,
      }, this.callApi)
    }
  }
  
  callApi() {
    const newYelpRestaurants = [];
    let app = this;
    this.state.mealpalRestaurants.forEach(restaurant => {
      axios.get('http://localhost:3002/rating', {
        params: {
          term: restaurant.name,
          location: restaurant.address
        }
      })
      .then(function (response) {
        if (response.data.name !== undefined) { 
          // TEMPORARY FIX: if yelp gave me back useful information like the restaurant name
          // then add it to state so we can display to user
          // otherwise, just ignore it
          newYelpRestaurants.push(response.data);
          app.setState({
            yelpRestaurants: newYelpRestaurants,
            sortedRestaurants: newYelpRestaurants,
            buttons: true
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        // To update: rather than just logging error, retry request
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

  /* --> BUTTON HANDLERS <-- */
  
  ratingSort() {
    let sortedRestaurants = [...this.state.yelpRestaurants];
    sortedRestaurants.sort((a,b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      else {
        return 1;
      }
    });
    this.setState({
      sortedRestaurants: sortedRestaurants
    })
  }
  
  alphabeticSort() {
    let sortedRestaurants = [...this.state.yelpRestaurants];
    sortedRestaurants.sort((a,b) => {
      if (a.name < b.name) {
        return -1;
      }
      else {
        return 1;
      }
    });
    this.setState({
      sortedRestaurants: sortedRestaurants
    })
  }

  // currently, this.state.yelpRestaurants is not in order. 
  // Need to change get request so that it returns an ordered array
  // Should be able to do this using promises -- look up
  // numericSort() {
    //   let originalOrder = this.state.yelpRestaurants;
    //   this.setState({
      //     sortedRestaurants: this.state.yelpRestaurants
      //   })
      // }
  
  hardRefresh() {
        window.location.reload(true);
  }

  render() {
    const restaurantListings = this.state.sortedRestaurants.map(({name, rating, url, key, review_count}) =>
      <div className="restaurant" key={key} onClick={()=> window.open(url)}>
        <a href={url} target="_blank">{name}</a> {this.renderStars(rating)} <span>{review_count} reviews </span>
      </div>
    );
    let buttons = '';
    if (this.state.buttons) {
      buttons =   
      <div className="col-3">          
        <i className="fa fa-star" onClick={this.ratingSort}></i>
        <i className="fa fa-sort-alpha-down" onClick={this.alphabeticSort}></i>
        {/* <i className="fa fa-sort-numeric-down" onClick={this.numericSort}></i> */}
        <i className="fa fa-sync-alt" onClick={this.hardRefresh}></i>
      </div>
    }
    
    return (
      <div>
        <div className="header row align-items-center">
          <div className="col-9">
            <img src="https://s3-us-west-1.amazonaws.com/yelplogo/Yelp_trademark_RGB.png" width="100"></img>
          </div>
            {buttons}
        </div>
        <div className="App">
            {restaurantListings}
        </div>
      </div>
    );
  }
}

export default App;