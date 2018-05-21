'use strict';
 
const yelp = require('yelp-fusion');
const { apiKey } = require('./apiKey.js');
 
const client = yelp.client(apiKey);
 
client.business('PaDFuHlHrFRd0g2ki2DevA').then(response => {
  console.log(response.jsonBody.rating);
}).catch(e => {
  console.log(e);
});