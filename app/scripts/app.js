'use strict';

var React = window.React = require('react');

var appNode = document.getElementById("app");

var Router = require('react-router')
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , RouteHandler = Router.RouteHandler
  , NotFoundRoute = Router.NotFoundRoute
  , Link = Router.Link;

let Menu = require('./ui/Menu');

let Header = React.createClass({
  getInitialState: function() {
    return {
      menuItems: [
        {href: 'resume', label: 'Resume'},
        {href: 'blog', label: 'Blog'}],
      name: 'Andrey Pushkarev'
    };
  },
  render: function() {
    return (
      <header className="navbar navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="resume">{this.state.name}</Link>
          </div>
          <Menu items={this.state.menuItems} />
        </div>
      </header>
    );
  }
});

let Content = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>{this.props.page}</h1>
        </div>
      </div>
    );
  }
});

var Resume = React.createClass({
  render: function () {
    return (
      <Content page="Resume"/>
    );
  }
});

var Blog = React.createClass({
  render: function () {
    return (
      <Content page="Blog"/>
    );
  }
});

var BlogPost = React.createClass({
  render: function () {
    return (
      <h1>
        BlogPost
      </h1>
    );
  }
});

var NotFound = React.createClass({
  render: function () {
    return (
      <h1>
        BlogPost
      </h1>
    );
  }
});

var NotFoundBlogPost = React.createClass({
  render: function () {
    return (
      <h1>
        BlogPost
      </h1>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Resume}/>
    <Route name="resume" handler={Resume}/>
    <Route name="blog" handler={Blog}>
      <Route name="blogPost" path="/blog/post/:postId" handler={BlogPost}/>
      <NotFoundRoute handler={NotFoundBlogPost}/>
    </Route>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, appNode);
});
