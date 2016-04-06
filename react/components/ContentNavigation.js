import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

class ContentNavigation extends React.Component {
  componentDidMount() {
    if (this.refs.options) {
      $(findDOMNode(this.refs.options)).dropdown();
    }
  }

  componentDidUpdate() {
    if (this.refs.options) {
      $(findDOMNode(this.refs.options)).dropdown();
    }
  }

  render() {
    const props = this.props;

    const navigations = (
      props.root.childPages &&
      props.root.childPages
            .filter( child => !!child.title )
            .map(child => ({
              path:props.pathPrefix + child.path,
              title: child.title,
              selected: child === props.selected
            }))
      ) || [];

    if (props.root.indexTitle) {
      navigations.unshift({ path: props.pathPrefix, title: props.root.indexTitle, selected: props.root === props.selected});
    }

    let options = null;
    if (props.root.options) {
      console.log("Options = ", props.root.options)
      options = (
        <div ref="options" className="ui dropdown icon item right">
          <i className="wrench icon" />
          <div className="menu">
            { Object.keys(props.root.options).map(text => {
              const action = props.root.options[text];
              if (action == null) {
                return <div key={text} className="header">{text}</div>
              } else {
                return <div key={text} className="item">{text}</div>
              }
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="ui secondary pointing menu">
          { navigations.map(nav => <Link to={nav.path} key={nav.path} className={"item" + (nav.selected?" active":"")}>{nav.title}</Link>)}
          { options }
      </div>
    );
  }
}

ContentNavigation.propTypes = {
  pathPrefix: React.PropTypes.string.isRequired,
  root: React.PropTypes.func.isRequired,
  selected: React.PropTypes.func.isRequired
}

export default ContentNavigation;
