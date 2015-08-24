'use strict';

var React = require('react')
  , marked = require('marked')
  , FaIcon = require('./FaIcon');

var resume = require('../resume.json');


var renderer = new marked.Renderer();

renderer.paragraph = function(text) {
  return text + '\n';
};

function createIdFromSectionTitle (title) {
  return title.toLowerCase().split(' ').join('_');
}


let Header = React.createClass({
  render: function () {
    let header = this.props.header;
    return (
      <div className="row bs-scrolling" id="contacts">
        <div className="col-sm-6 text-left vertical-top">
          <div className="row">
            <div className="col-xs-4">
              <img src="images/ava.jpeg" className="img-circle center-block img-responsive"/>
            </div>
            <div className="col-xs-8">
              <h3 className="m-t-10">{header.name}</h3>
              <h4>{header.position}</h4>
              <h5>{header.location}</h5>
            </div>
          </div>
        </div>
        <div className="col-sm-3 text-left vertical-top">
          <ul className="list-unstyled m-t-10">
            <li><a href={"tel:" + header.phone} target="_blank"><FaIcon icon="phone"/>{header.phone}</a></li>
            <li><a href={"mailto:" + header.email} target="_blank"><FaIcon icon="at"/>{header.email}</a></li>
            <li><a href={"skype:" + header.skype} target="_blank"><FaIcon icon="skype"/>{header.skype}</a></li>
          </ul>
        </div>
        <div className="col-sm-3 text-left vertical-top">
          <ul className="list-unstyled m-t-10">
            <li><a href={"https://github.com/" + header.github} target="_blank"><FaIcon icon="github"/>Github</a></li>
            <li><a href={"https://linkedin.com/in/" + header.linkedIn} target="_blank"><FaIcon icon="linkedin"/>LinkedIn</a></li>
            <li><a href={"https://careers.stackoverflow.com/" + header.stackoverflow} target="_blank"><FaIcon icon="stack-overflow"/>Stack Overflow</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

let RecordHeader = React.createClass({
  render: function () {
    let header = this.props.header;
    return (
      <div className="row">
        <div className="col-sm-3 text-left">
          <strong>{header.col1}</strong>
        </div>
        <div className="col-sm-6 text-center">
          <strong>{header.col2}</strong>
        </div>
        <div className="col-sm-3 text-right">
          <strong>{header.col3}</strong>
        </div>
      </div>
    );
  }
});

let Record = React.createClass({
  render: function () {
    let record = this.props.record;
    function createEntry (item) {
      let text = marked(item, {sanitize: true, renderer: renderer });
      return <li><small dangerouslySetInnerHTML={{__html: text}}></small></li>;
    }
    return (
      <div>
        {record.header ? <RecordHeader header={record.header}/> : ''}
        <div className="row">
          <ul>
            {this.props.record.entries.map(createEntry)}
          </ul>
        </div>
      </div>
    );
  }
});

let Section = React.createClass({
  render: function () {
    let section = this.props.section;
    let sectionId = createIdFromSectionTitle(section.title);
    function createRecord (item) {
      return <Record record={item}/>;
    }
    return (
      <div className="bs-scrolling" id={sectionId}>
        <a href={'#' + sectionId}><h3>{section.title}</h3></a>
        <hr/>
        {this.props.section.records.map(createRecord)}
      </div>
    );
  }
});

let Body = React.createClass({
  render: function () {
    function createSection (item) {
      return <Section section={item}/>;
    }
    return (
      <div>
        {this.props.sections.map(createSection)}
      </div>
    );
  }
});

let SideMenu = React.createClass({
  getInitialState: function () {
    return resume;
  },
  render: function () {
    function createLink (section) {
      let sectionId = createIdFromSectionTitle(section.title);
      return <li><a href={'#' + sectionId}>{section.title}</a></li>;
    }
    return (
      <nav data-spy="affix" className="bs-sidebar hidden-print hidden-xs hidden-sm affix" data-offset-top="-20" data-offset-bottom="100">
        <ul className="nav bs-sidenav">
          <li><a href="#contacts">Contacts</a></li>
          {this.state.sections.map(createLink)}
        </ul>
        <a className="back-to-top" href="Resume.pdf" target="_blank"><i className="fa fa-lg fa-file-pdf-o"/> Download as PDF</a>
      </nav>
    );
  }
});

let Resume = React.createClass({
  getInitialState: function () {
    return resume;
  },
  render: function () {
    return (
      <div id="resume">
        <Header header={this.state.header}/>
        <Body sections={this.state.sections}/>
      </div>
    );
  }
});

module.exports.Body = Resume;
module.exports.SideMenu = SideMenu;
