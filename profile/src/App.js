import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import Story from './components/Story';
import Sidebar from './components/Sidebar';
import firebase from 'firebase';
import { firebaseAuth } from './config/Fire';
import { getProfileData, getDP } from './helpers/read';

class App extends Component {
  state = {
    name: null,
    notFOund: false,
    isLoaded: false,
    data: null,
    DPImage: '',
  };
  componentWillMount() {
    const { username } = this.props.match.params;
    getProfileData(username)
      .then(data => {
        if (data) {
          this.setState({
            isLoaded: true,
            data,
          });
        }
      })
      .catch(err => {
        if (err === 'USER_DOES_NOT_HAVE_PROFILE_DATA') {
          console.log('USER_DOES_NOT_HAVE_PROFILE_DATA');
        } else {
          console.log('USER_DOES_NOT_HAVE_PROFILE_DATA : dfdfdf');
        }
        this.setState({ notFOund: true, isLoaded: true });
      });

    getDP(username).then(url => {
      console.log(url);
      this.setState({ DPImage: url });
    });
  }
  render() {
    const { sidebarWidth, ChildComponent, ...rest } = this.props;
    const { notFOund, isLoaded, data, DPImage } = this.state;
    const { username } = this.props.match.params;

    if (!isLoaded) {
      return (
        <div className="loader">
          <span className="brand">Itsmybio.me</span>
        </div>
      );
    }
    if (notFOund) {
      return (
        <div>
          user: {username} not found
        </div>
      );
    }
    return (
      <div>
        <Sidebar
          DPImage={DPImage}
          themeColor={data.themeColor}
          imgStyle={{ width: sidebarWidth }}
          {...rest}
          contact={data.contact}
        />
        <ChildComponent {...rest} data={data} />
      </div>
    );
  }
}

export default App;
