"use strict";

const React = require('react');
const { NavigationDock } = require('./components');

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      user: this.props.user
    }
  }

  render() {
    return (
      <div className="main">
        <NavigationDock />
        <div className="content">
          <div className="top-bar">
            <div>
              <button className="ui icon primary button">
                <i className="plus icon" />
              </button>
            </div>
            <div className="ui icon input">
              <input type="text" placeholder="Search ..." />
              <i className="search icon" />
            </div>
            <div>
              <div className="ui dropdown">
                User
              </div>
            </div>
          </div>
          <div className="secondary-nav">
            <div className="ui secondary pointing menu">
              <a className="item">
                Data Sources
              </a>
              <a className="item active">
                Data Loggers
              </a>
              <div className="right header item">
                header
              </div>
            </div>
          </div>
          <div className="content-body">
            This is where the content is supposed to appear
          </div>
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  user: React.PropTypes.object
}

App.propTypes = {
  user: React.PropTypes.object.isRequired,  // the currently logged in user
}

module.exports = App;
