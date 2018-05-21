'use strict';

const yelp = require('yelp-fusion');
const { apiKey } = require('./apiKey.js');

const searchRequest = {
  term:'The Melt',
  location: '925 Market St. , San Francisco, CA'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});