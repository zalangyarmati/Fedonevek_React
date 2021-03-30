import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home'; 
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Game } from './components/Game';
import { Main } from './components/Main';
import { Room } from './components/Room';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
         <Layout>
            <AuthorizeRoute exact path='/' component={Main} />
            <AuthorizeRoute path='/room' component={Room} />
            <AuthorizeRoute path='/game' component={Game} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
         </Layout>
    );
  }
}
