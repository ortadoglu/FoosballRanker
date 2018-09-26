import React, { Component } from 'react';

import './App.css';
import BottomNavigation from './components/bottomNavigation';
import Header from './components/header';
import Main from './components/main';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC_oOtzOivAWh6VPFtOxsKxOmPT0KqJxcU",
  authDomain: "foosbalranker.firebaseapp.com",
  databaseURL: "https://foosbalranker.firebaseio.com",
  projectId: "foosbalranker",
  storageBucket: "foosbalranker.appspot.com",
  messagingSenderId: "335564613048"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 0,
    };
  }
  test = (value) => {
    this.setState({screen: value});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main displayMode={this.state.screen} />
        <div className="BottomSelector">
          <BottomNavigation  updateMain={this.test}/>
        </div>
      </div>
    );
  }
}

export default App;