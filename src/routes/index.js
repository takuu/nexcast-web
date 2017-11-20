import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom';
// import { Switch } from 'react-router';
import LeagueListPage from './../containers/LeagueListPage';
import LeagueLayout from '../containers/League/LeagueLayout';



// const store = configureStore();


const routes = [
  {
    component: App,
    routes: [
      { path: '/leagues', component: LeagueListPage },
      { path: '/', component: HomePage, exact: true },

      {
        path: '/:leagueName',
        component: LeagueLayout,
        routes: [

          //Games
          {
            path: '/:leagueName/division/:divisionId/game/:gameId',
            component: GameLayout,
            routes: [
              { path: '/:leagueName/division/:divisionId/game/:gameId', component: GamePage }
            ]
          },

          //Teams
          {
            path: '/:leagueName/division/:divisionId/team/:teamId',
            component: TeamLayout,
            routes: [
              {
                path: '/:leagueName/division/:divisionId/team/:teamId',
                component: TeamPage,
                routes: [
                  // there should be routeIndex here...
                  { path: '/:leagueName/division/:divisionId/team/:teamId', exact: true, component: TeamGamesPage },
                  { path: '/:leagueName/division/:divisionId/team/:teamId/roster', component: RosterPage },
                  { path: '/:leagueName/division/:divisionId/team/:teamId/team-stats', component: TeamStatsPage },
                ]
              }
            ]
          },

          //Players
          {
            path: '/:leagueName/team/:teamId/player/:playerId',
            component: PlayerLayout,
            routes: [
              {
                path: '/:leagueName/team/:teamId/player/:playerId',
                component: PlayerPage,
                routes: [
                  // there should be routeIndex here...
                  { path: '/:leagueName/team/:teamId/player/:playerId', exact: true, component: PlayerProfilePage },
                  { path: '/:leagueName/team/:teamId/player/:playerId/game-log', component: PlayerGamesPage },
                  { path: '/:leagueName/team/:teamId/player/:playerId/split-stats', component: PlayerStatsPage },
                ]
              }
            ]
          },



          {
            path: '/:leagueName',
            component: DivisionLayout,
            routes: [
              {path: '/:leagueName', exact: true, component: LeaguePage},
              {path: '/:leagueName/register', exact: true, component: LeagueRegisterPage},
              {path: '/:leagueName/rules', exact: true, component: LeagueRulesPage},
              {path: '/:leagueName/eligibility', exact: true, component: LeagueEligibilityPage},
              {path: '/:leagueName/about', exact: true, component: LeagueAboutPage},
              {path: '/:leagueName/contact', exact: true, component: LeagueContactPage},
              {path: '/:leagueName/search', exact: true, component: SearchResultPage},
              {path: '/:leagueName/search:searchName', exact: true, component: SearchResultPage},
              {
                path: '/:leagueName/division/:divisionId',
                component: DivisionPage,
                routes: [
                  {path: '/:leagueName/division/:divisionId', exact: true, component: SchedulePage},
                  {path: '/:leagueName/division/:divisionId/home', exact: true, component: SchedulePage},
                  {path: '/:leagueName/division/:divisionId/standing', exact: true, component: StandingPage},
                  {path: '/:leagueName/division/:divisionId/teams', exact: true, component: TeamsPage},
                ]
              },

            ],

          }
        ],
      },

    ]
  }
];


export default routes;