const express = require('express');
const cors = require('cors')
const yelp = require('yelp-fusion');
const { apiKey } = require('./apiKey.js');

const app = express();
app.use(cors());
const client = yelp.client(apiKey);

// read more on setting env vars in create-react-app
// https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d
port = 3002;

app.get('/rating', function(req, res){
  const searchRequest = {
    term: req.query.term,
    location: req.query.location
  };
  client.search(searchRequest).then(searchResponse => {
    const firstResult = searchResponse.jsonBody.businesses[0];
    const id = firstResult.id;
    client.business(id).then(businessResponse => {
      rating = businessResponse.jsonBody.rating;
      url = businessResponse.jsonBody.url;
      name = businessResponse.jsonBody.name;
      key = businessResponse.jsonBody.id;
      review_count = businessResponse.jsonBody.review_count;
      res.send(JSON.stringify({name, rating, url, key, review_count}));
    }).catch(e => {
      res.send(e);
    });
  }).catch(e => {
    res.send(e);
  });
});

app.listen(port, () => console.log(`YelpHelp Server listening on port ${port}!`))