import React from 'react';
import SailsApp from 'react-sails';

import NavigationDock from './NavigationDock';
import TopBar from './TopBar';
import ContentNavigation from '../ContentNavigation';

class Application extends React.Component {
  render() {
    // The root path for application (should be '/app/')
    const rootPath = this.props.route.path;

    // Also detect the selected route
    const topLevelRoute = this.props.routes[1];
    const selected = topLevelRoute.indexRoute ? topLevelRoute.indexRoute.component : topLevelRoute.component;

    const { initialData, isServer, user } = this.context;
    const navigations = this.props.route.childRoutes
              .map( route => (route.childRoutes ? route.indexRoute.component : route.component) )
              .filter( component => !!component.title)
              .map( component => ({ path: (rootPath + component.path), title: component.title, selected: component===selected }))

    // if the index route is allowed we will put it as well
    if (this.props.route.indexRoute.component.title) {
      const r = this.props.route.indexRoute.component;
      navigations.unshift({ path: rootPath, title: r.title, selected: (r===selected)});
    }




    return (
      <SailsApp initialData={initialData} isServer={isServer}>
        <div className="main">
          <NavigationDock navigations={navigations}/>
          <div className="content">
            <div className="top">
              <TopBar user={user}/>
              <ContentNavigation pathPrefix={rootPath + topLevelRoute.path} root={selected} selected={this.props.routes[this.props.routes.length-1].component}/>
            </div>
            <div className="content-body">
              <div className="ui segment">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </SailsApp>
    );
  }
}


// The context is provided by RouterApp (./routes.js)
Application.contextTypes = {
  user: React.PropTypes.object.isRequired,
  isServer: React.PropTypes.bool.isRequired,
  initialData: React.PropTypes.object.isRequired
}

export default Application;
