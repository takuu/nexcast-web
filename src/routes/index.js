import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
import universal from 'react-universal-component';

const PodcastListPage = universal(import('../containers/PodcastListPage'));
const App = universal(import('../containers/App'));
const PodcastPage = universal(import('../containers/PodcastPage'));
const HomePage = universal(import('../containers/HomePage'));
const EpisodePage = universal(import('../containers/EpisodePage'));





// import { Switch } from 'react-router';




// const store = configureStore();


const routes = [
  {
    component: App,
    routes: [
      { path: '/', component: HomePage, exact: true },
      { path: '/podcastlist', component: PodcastListPage },
      { path: '/podcast/:podcastId', component: PodcastPage, exact: true },
      { path: '/search/:term', component: PodcastListPage, exact: true },
      { path: '/podcast/:podcastId/episode/:episodeKey', component: EpisodePage },
    ]
  }
];


export default routes;