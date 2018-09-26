import React, { Component } from 'react';
import Team from './team';
import Stats from './stats';
import Selector from './playerSelector';
import Button from '@material-ui/core/Button';
import ThumbsIcon from '@material-ui/icons/ThumbsUpDown';
import Icon from '@material-ui/core/Icon';
import EloRating from './utils/ratingCalculator';
import NewPlayer from './addNewPlayer.js';
import { updatePlayer, saveToLogs, getPlayers } from './utils/dbFunctions.js';

import './main.css'

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
      winningTeam: 0,
      selectedPlayer: 0,
      dialogOpen: false,
      allPlayers: [],
    };
  }

  componentDidMount = () => {
    getPlayers(this.updatePlayersData);
  }

  updatePlayersData = (userData) => {
    this.setState({
      allPlayers: Object.keys(userData).map((id) => {
        userData[id]["Id"] = id;
        return userData[id]
      })
    })
  }

  setWinner = (winningTeam) => {
    this.setState({ winningTeam })
  }

  setPlayer = (selectedPlayer) => {
    this.setState({ selectedPlayer: selectedPlayer - 1 });
    this.setState({ dialogOpen: true });
  }

  selectPlayer = (player) => {
    this.setState({ dialogOpen: false });
    this.resetIfAlreadySelected(player);
  }

  resetIfAlreadySelected = (selectedPlayer) => {
    this.setState({
      players: this.state.players.map((player, index) => {
        if (index === this.state.selectedPlayer) {
          return selectedPlayer;
        }
        else {
          if (selectedPlayer.Id === this.state.players[index].Id) return defaultPlayer
          else return this.state.players[index];
        }
      })
    });
  }

  checkPlayerSelection = () => {
    let allSelected = true;
    this.state.players.forEach(player => {
      if (player.Id === 'id1') allSelected = false;
    });
    return allSelected;
  }

  recalculateRatings = () => {
    if (this.state.winningTeam === 0) {
      alert("select a winner by pressing on one of the trophies");
      return;
    }
    if (!this.checkPlayerSelection()) {
      alert("select all 4 players");
      return;
    }

    let t1Rating = this.state.players[0].MMR + this.state.players[1].MMR;
    let t2Rating = this.state.players[2].MMR + this.state.players[3].MMR;
    let change = EloRating(t1Rating, t2Rating, 30, this.state.winningTeam === 1 ? true : false);
    this.updateMmrAndSave(change, this.state.winningTeam);
  }

  updateMmrAndSave = (change, winner) => {
    let roundChange = Math.round(change);
    let players = this.state.players;

    players.forEach((player, index) => {
      player.Games++;
      if ((index < 2 && winner === 1) || (index >= 2 && winner === 2)) {
        player.MMR += roundChange;
        player.Victories++
      }
      else {
        player.MMR -= roundChange;
      }
      updatePlayer(player);
    });

    saveToLogs (players, winner);
    this.setState({ winningTeam: 0 });
  }

  render() {
    return (
      <div className="MainBody">
        {this.props.displayMode === 0 &&
          <div>
            <div className="TeamsContainer">
              <Team teamNo={0} player1={this.state.players[0]} player2={this.state.players[1]} setAsWinner={() => this.setWinner(1)} isWinner={this.state.winningTeam === 1} setPlayer={this.setPlayer} />
              <Team teamNo={1} player1={this.state.players[2]} player2={this.state.players[3]} setAsWinner={() => this.setWinner(2)} isWinner={this.state.winningTeam === 2} setPlayer={this.setPlayer} />
            </div>
            <Button variant="contained" color="primary" onClick={this.recalculateRatings} >
              team {this.state.winningTeam} wins!
              <Icon><ThumbsIcon /></Icon>
            </Button>

          </div>
        }
        {this.props.displayMode === 1 &&
          <Stats players={this.state.allPlayers} />
        }

        {this.props.displayMode === 2 &&
          <NewPlayer />
        }
        <Selector state={this.state.dialogOpen} players={this.state.allPlayers} selected={this.selectPlayer} />
      </div>
    );
  }
}

export default MainBody;

const defaultPlayer = { Nickname: 'Pick a player', MMR: '', Id: 'id1' };