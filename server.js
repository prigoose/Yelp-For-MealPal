const express = require('express');
const app = express();
const yelp = require('yelp-fusion');
const { apiKey } = require('./apiKey.js');

const client = yelp.client(apiKey);

// read more on setting env vars in create-react-app
// https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d
port = 3002;

// this express server will not serve static files
// the static files are served directly in the chrome extension, 
// which will look at my index.html and other items in my 'public' folder

app.get('/search', function(req, res){
  console.log('req.query.term: ', req.query.term);
  console.log('req.query.location: ', req.query.location);
  const searchRequest = {
    term: req.query.term,
    location: req.query.location
  };
  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const id = firstResult.id;
    const JSONid = JSON.stringify(id);
    res.send(JSONid);
  }).catch(e => {
    res.send(e);
  });
});

app.get('/details', function(req, res){
  client.business(req.query.id).then(response => {
    JSONrating = JSON.stringify(response.jsonBody.rating);
    res.send(JSONrating);
  }).catch(e => {
    res.send(e);
  });
});

app.listen(port, () => console.log(`YelpHelp Server listening on port ${port}!`))