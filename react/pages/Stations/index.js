import React from 'react';

class Stations extends React.Component {
  render() {
    return (
      <div>List of Stations</div>
    );
  }
}

Stations.path = 'stations/';
Stations.title = 'Stations';    // Displayed on the navigation dock
Stations.indexTitle = 'All';    // Displayed on the content navigation

Stations.options = {
  'New Station': function () {
    window.alert('New Station');
  },
};

export default Stations;
