import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home'; 
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Game } from './components/Game';
import { Main } from './components/Main';
import { CreateRoom } from './components/CreateRoom';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
         <Layout>
            <AuthorizeRoute exact path='/' component={Main} />
            <AuthorizeRoute path='/room' component={CreateRoom} />
            <AuthorizeRoute path='/game/:id' component={Game} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
         </Layout>
    );
  }
}
