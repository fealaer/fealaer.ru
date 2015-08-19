'use strict';

var React = require('react')
  , Router = require('react-router')
  , Link = Router.Link;

var MenuItem = React.createClass({
  render: function() {
    let item = this.props.item;
    let className = '';
    if (~window.location.pathname.split('/').indexOf(item.href)) {
      className = 'active';
    }
    return (
      <li className={className}>
        <Link to={item.href}>{item.label}</Link>
      </li>
    );
  }
});

var Menu = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <MenuItem item={item}/>;
    };
    return (
      <nav className="collapse navbar-collapse" id="navbar-collapse">
        <ul className="nav nav-pills navbar-right">
          {this.props.items.map(createItem)}
        </ul>
      </nav>
    );
  }
});

module.exports = Menu;
