import React from 'react';
import Inventory from './Inventory';

class StationPage extends React.Component {
  render() {
    return (
      <div>Show Station Information for {this.props.params.id}</div>
    );
  }
}

StationPage.path = 'station/:id/';
StationPage.indexTitle = 'Meta Data';
StationPage.title = null; // We don't want this page listed on navigation dock
StationPage.childPages = [Inventory];

export default StationPage;
