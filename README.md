# Yelp-For-MealPal

As a MealPal user, I found it frustrating that no user reviews are provided on the meal listings page. I had no way to tell if a meal was good, besides opening a new tab and looking up the restaurant on Yelp.

This Chrome extension crawls the listings page for the restaurants listed, and then displays the restaurants and their Yelp reviews. Each restaurant name links to the Yelp review page.
> ![gif](https://imgur.com/DCAEpb6.gif)

## Tech 

- Cheerio.js for web crawling
- React for front-end
- Express as the server
- Yelp Fusion API for restaurant data

## Setup

1. `npm run server`
2. `npm start`

*This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
