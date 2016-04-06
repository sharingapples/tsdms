import React from 'react';

import Application from './components/layout';

import Dashboard from './pages/Dashboard';
import * as pages from './pages';
import SailsApp from 'react-sails';
import { Router, RouterContext } from 'react-router';

// A PageHolder component for Pages containing child routes (pages)
const PageHolder = (props) => (
  <div>{props.children}</div>
);

const allPages = Object.keys(pages).map( key => pages[key] );
const routes = [
  {
    path: Dashboard.path,
    component: Application,
    indexRoute: { component: Dashboard },

    childRoutes: allPages
                   //.filter( page => true )
                   .map(page => {
                     const route = {
                       path: page.path
                     }
                     if (page.childPages) {
                       route.component = PageHolder;
                       route.indexRoute = { component: page };
                       route.childRoutes = page.childPages.map( child => ({path: child.path, component: child}))
                     } else {
                       route.component = page
                     }

                     return route;
                   })
  }
]

console.log("routes.js ", routes);

class RouterApp extends React.Component {

  getChildContext() {
    console.log("RouterApp getChildContext NODE=", NODE);
    return {
      isServer: !!NODE,
      user: this.props.user,
      initialData: this.props.initialData
    }
  }

  render() {
    const {user, isServer, initialData, ...other} = this.props;
    // Compile time variable set by webpack
    if (NODE) {
      return <RouterContext {...other} />
    } else {
      return <Router {...other} />
    }
  }
}

RouterApp.childContextTypes = {
  isServer: React.PropTypes.bool,
  user: React.PropTypes.object,
  initialData: React.PropTypes.object
}
RouterApp.routes = routes;

export default RouterApp;
