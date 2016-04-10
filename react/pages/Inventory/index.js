import React from 'react';

class InventoryPage extends React.Component {
  render() {
    return (
      <div>Show list of all items</div>
    );
  }
}

InventoryPage.path = 'inventory/';
InventoryPage.title = 'Inventory';
InventoryPage.indexTitle = 'Items';

export default InventoryPage;
