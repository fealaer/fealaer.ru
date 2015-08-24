'use strict';

var React = window.React = require('react');

var appNode = document.getElementById("app");

var Router = require('react-router')
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , RouteHandler = Router.RouteHandler
  , NotFoundRoute = Router.NotFoundRoute
  , Link = Router.Link;

var Menu = require('./ui/Menu')
  , ResumeBody = require('./ui/Resume').Body
  , ResumeSideMenu = require('./ui/Resume').SideMenu;

var Header = React.createClass({
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
      <header className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="resume"><img src="images/ava.jpeg" className="brand-image img-circle"/></Link>
            <Link className="navbar-brand" to="resume">{this.state.name}</Link>
          </div>
          <Menu items={this.state.menuItems} />
        </div>
      </header>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10" role="main">
            <div>
              {this.props.page}
            </div>
          </div>
          <div className="col-md-2 scroll-spy" role="navigation">
            {this.props.sideMenu}
          </div>
        </div>
      </div>
    );
  }
});

var Resume = React.createClass({
  render: function () {
    let page = <ResumeBody/>;
    let sideMenu = <ResumeSideMenu/>;
    return (
      <Content page={page} sideMenu={sideMenu}/>
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
