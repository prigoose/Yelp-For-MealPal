// unused sub-component
// I may refactor so that I use this 'Listing' subcomponent for each restaurant

import React, { Component } from 'react';

class Listing extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <button>
      <li key={this.props.index}><a href={this.props.url} target="_blank">{this.props.name}</a>example</li>
      </button>
    )
  }
}

export default Listing;

// <button onClick={this.props.url => this.openYelpPage(this.props.url)}>
// <li key={this.props.index}><a href={this.props.url} target="_blank">{this.props.name}</a> {this.renderStars(rating)} </li>
// </button>

// < Listing name={name} url={url} rating={rating} index={index}/>
