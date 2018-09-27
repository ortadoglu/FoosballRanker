import React, { Component } from 'react';

import cup from '../img/cup.png';

import Player from './player';

import './team.css';

class Team extends Component {
  render() {
    let cupClass = ["transparent"];
    if(this.props.isWinner) {
      cupClass.push('ish');
    }

    return (
      <div className="team">
        <Player name={this.props.player1.Nickname} mmr={this.props.player1.MMR} setPlayer={()=>this.props.setPlayer(this.props.teamNo*2 + 1)} />
        <Player name={this.props.player2.Nickname} mmr={this.props.player2.MMR} setPlayer={()=>this.props.setPlayer(this.props.teamNo*2 + 2)}/>
		<div>
        	<img src={cup} alt="cupLogo" onClick={this.props.setAsWinner} className={cupClass.join(' ')} />
		</div>
      </div>
    );
  }
}

export default Team;
