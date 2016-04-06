import React from 'react';

import { StationSearch, UserMenu } from '../';

class TopBar extends React.Component {
  render() {
    return (
      <div className="ui menu">
        <StationSearch />
        <UserMenu user={this.props.user} />
      </div>
    );
  }
}

export default TopBar;
