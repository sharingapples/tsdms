import React from 'react';
import ParameterPage from './ParameterPage';
import { ModelView } from 'react-sails';

import User from '../../models/User';

class Admin extends React.Component {
  render() {
    return (
      <div>
        <ModelView header="Active Users" model={User} />
      </div>
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
