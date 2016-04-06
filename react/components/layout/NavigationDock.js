"use strict";

import React from 'react'
import { Link } from 'react-router';


const logo = require('../../../assets/img/logo_32.png');

const NavigationDock = (props) => (

    <div className="navigation-dock ui vertical menu inverted sticky" style={{borderRadius: 0, borderWidth: "0 1 0 0", boxShadow: 'none', margin: 0, overflow: 'hidden'}}> 
      <div className="item">
        <a className="ui logo icon image" href="/" style={ { width: 35, marginRight: "1em"}}>
          <img src={logo} />
        </a>
        <a href="/">
          <b>TS-DMS</b>
        </a>
      </div>
      { props.navigations.map( nav => (
        <Link key={nav.path} to={nav.path} className={"item" + (nav.selected?" active":"")}>
          {nav.title}
        </Link>
      )) }
    </div>

);

NavigationDock.propTypes = {
  navigations: React.PropTypes.array.isRequired,
}

module.exports = NavigationDock;
