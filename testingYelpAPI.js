'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'w0Om7LI2h3N2oDyDNtEMekwm5mnfiyzniqf-4z9MEPTfVs7PuT2eyeLGC3xSGDBML9rbBEmzBsrQJ-aAcF3k1nE02cvdm4yBIBdSJvUgqqBz9ng_OnETBOLXw5AAW3Yx';

const searchRequest = {
  term:'The Melt',
  location: '925 Market St. , San Francisco, CA'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, ['id'], 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});