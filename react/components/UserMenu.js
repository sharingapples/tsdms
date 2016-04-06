import React  from 'react';
import { findDOMNode } from 'react-dom';

const USERCONTENT_URL = "/usercontent/user/";

// default menu options for the user
// TODO Make is dynamic by allowing addition of properties to the component later
const DEFAULT_OPTIONS = [
  { link: "/user/profile", text: "Profile" },
  { link: "/user/change_password", text: "Change Password" },
  "-",
  { link: "/logout", text: "Sign out" }
]

// helper method to generate the user menu option
function generateOption(option, index) {
  if (option === "-") {
    return <div key={index} className="divider" />
  } else if (typeof option === "object"){
    return <a key={index} className="item" href={option.link}>{option.text}</a>;
  }
}

// The DropDown component
class UserMenu extends React.Component {

  componentDidMount() {
    $(findDOMNode(this)).dropdown();
  }

  render() {
    return (
      <div className="ui dropdown right item">
        { (this.props.user.image &&
            <img className="ui avatar image"
                src={ USERCONTENT_URL  + this.props.user.image  } />) ||
            <i className="user icon" />}
        { this.props.user.name }
        <i className="dropdown icon" />
        <div className="menu">
          {DEFAULT_OPTIONS.map(generateOption)}
        </div>
      </div>
    );
  }
}

UserMenu.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default UserMenu;
