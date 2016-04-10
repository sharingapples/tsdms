import React from 'react';
import ParameterPage from './ParameterPage';

class Admin extends React.Component {
  render() {
    return (
      <div>Main administrative page. List the Users.</div>
    );
  }
}

Admin.path = 'admin/';
Admin.title = 'Admin';
Admin.indexTitle = 'Users';

Admin.childPages = [ParameterPage];

Admin.option = {
  'New User': function () {
    window.alert('New User');
  },
};

export default Admin;
