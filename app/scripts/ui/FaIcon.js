'use strict';

var React = require('react');

var FaIcon = React.createClass({
  render: function () {
    let iconClass = 'fa fa-stack-1x fa-' + this.props.icon;
    return (
      <span className="fa-stack fa-md">
        <i className="fa fa-square-o fa-stack-2x"></i>
        <i className={iconClass}></i>
      </span>
    );
  }
});

module.exports = FaIcon;
