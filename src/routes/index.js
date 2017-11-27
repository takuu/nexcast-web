import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom';
import PodcastListPage from "../containers/PodcastListPage";
import App from '../containers/App'
import PodcastPage from "../containers/PodcastPage";
import HomePage from "../containers/HomePage";
// import { Switch } from 'react-router';




// const store = configureStore();


const routes = [
  {
    component: App,
    routes: [
      { path: '/', component: HomePage, exact: true },
      { path: 'podcastlist', component: PodcastListPage },
      { path: 'podcast/podcastId', component: PodcastPage },



    ]
  }
];


export default routes;