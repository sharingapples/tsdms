import React from 'react';

class Dashboard extends React.Component {
  render() {
    return <div>Dashboard specific to the user</div>
  }
}

Dashboard.path = "/app/";       // The link to the home page
Dashboard.title = "Dashboard";  // The text we want to display on the side bar

export default Dashboard;
