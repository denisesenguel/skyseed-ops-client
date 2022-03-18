# Skyseed Ops Prototype Built with ReactJS

Find the deployed version [here](https://skyseed-ops.netlify.app/)

The API it is built on may be found [in this repo](https://github.com/denisesenguel/skyseed-ops-server). 

## Local Setup

Install all relevant dependencies by running `npm install`

Create an `.env` with the following contents 
```
REACT_APP_API_URL=https://localhost:5005/path/to/local/api
REACT_APP_MAPBOX_TOKEN=your-mapbox-account-access-token
REACT_APP_MAPBOX_STYLE=mapbox://styles/link-to-your-style
```
[Read this](https://docs.mapbox.com/help/getting-started/access-tokens/) for more information on how to get a Mapbox access token.
For the style, you may use your own custom styles or public ones.

Note that you'll need the API running locally in order for the app to be run in development mode (see below).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Automation

On push to main, a new version is automatically deployed to Netlify.

## Misc
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).