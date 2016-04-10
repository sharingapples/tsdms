import React from 'react';

class StationInventoryPage extends React.Component {
  render() {
    return (
      <div>Inventory specific to Station {this.props.params.id}</div>
    );
  }
}

StationInventoryPage.path = 'inventory/';
StationInventoryPage.title = 'Inventory';
StationInventoryPage.indexTitle = 'Inventory';

export default StationInventoryPage;
