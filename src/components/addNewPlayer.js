import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addPlayer } from './utils/dbFunctions.js';

import './team.css';

class NewPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      nickname: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  clearState() {
    this.setState({
      firstName: '',
      lastName: '',
      nickname: '',
    });
  }

  PlayerSelected = () => {
    addPlayer(this.state);
    this.clearState();
  }

  render() {
    return (
      <div className="NewPlayer">
        <TextField
          id="standard-dense"
          label="First name"
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
        />
        <TextField
          id="standard-dense"
          label="Nickname"
          value={this.state.nickname}
          onChange={this.handleChange('nickname')}
        />
        <TextField
          id="standard-dense"
          label="Last name"
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
        />
        <Button variant="contained" color="primary" onClick={this.PlayerSelected}>
          Add new player
        </Button>
      </div>
    );
  }
}

export default NewPlayer;

