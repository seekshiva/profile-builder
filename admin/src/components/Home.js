import React, { Component } from 'react';
import firebase from 'firebase';
import { logout } from '../helpers/auth';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import GetName from './forms/GetName';
import GetWho from './forms/GetWho';
import GetShortDesc from './forms/GetShortDesc';
import GetContact from './forms/GetContact';
import GetStory from './forms/GetStory';

import { getProfileData, getGlobalWho, getEmail } from '../helpers/read';

export default class Home extends Component {
  state = {
    isLoaded: false,
    name: null,
    who: null,
    globalWhoList: null,
    shortDesc: null,
    contact: null,
    story: null,
    email: null,
  };

  componentWillMount() {
    getProfileData(this.getProfileData);
    getGlobalWho(this.getGlobalWho);
  }

  getProfileData = data => {
    if (data) {
      this.setState({
        isLoaded: true,
        name: data.name || '',
        who: data.who || '',
        shortDesc: data.shortDesc || '',
        contact: data.contact || '',
        story: data.story || '',
      });
    }
  };

  getGlobalWho = data => {
    this.setState({
      globalWhoList: data || [],
    });
  };

  render() {
    const { match } = this.props;
    const { isLoaded } = this.state;

    return (
      <div>
        Welcome {this.state.name}, {getEmail()} {' '}
        <button onClick={logout}>Logout</button>
        <nav className="nav">
          <NavLink
            to={`${match.url}/name`}
            className="nav-link"
            activeClassName="active"
          >
            Name
          </NavLink>
          <NavLink to={`${match.url}/who`} className="nav-link">
            Who
          </NavLink>
          <NavLink to={`${match.url}/desc`} className="nav-link">
            Short Description
          </NavLink>
          <NavLink to={`${match.url}/contact`} className="nav-link">
            Contact
          </NavLink>
          <NavLink to={`${match.url}/story`} className="nav-link">
            Story
          </NavLink>
        </nav>
        <Route
          exact
          path={`${match.url}/name`}
          render={() => <GetName name={this.state.name} isLoaded={isLoaded} />}
        />
        <Route
          exact
          path={`${match.url}/who`}
          render={() =>
            <GetWho
              who={this.state.who}
              globalWhoList={this.state.globalWhoList}
              isLoaded={isLoaded}
              getGlobalWho={() => {
                getProfileData(this.getProfileData);
                getGlobalWho(this.getGlobalWho);
              }}
            />}
        />
        <Route
          exact
          path={`${match.url}/desc`}
          render={() =>
            <GetShortDesc
              shortDesc={this.state.shortDesc}
              isLoaded={isLoaded}
            />}
        />
        <Route
          exact
          path={`${match.url}/contact`}
          render={() =>
            <GetContact contact={this.state.contact} isLoaded={isLoaded} />}
        />
        <Route
          exact
          path={`${match.url}/story`}
          render={() =>
            <GetStory story={this.state.story} isLoaded={isLoaded} />}
        />
      </div>
    );
  }
}
