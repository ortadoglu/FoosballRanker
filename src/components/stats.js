import React, { Component } from 'react';
import './stats.css';
import Icon from '@material-ui/core/Icon';
import FlashIcon from '@material-ui/icons/FlashOn';

class Stats extends Component {
  render() {
    return (
      <div className="Stats">
        <div>Hall of Fame</div>
        <div className="Rankings">
          <div className="Header">
            <div>Rank</div>
            <div className="ExtraFlex">Name</div>
            <div>Rating</div>
            <div className="AdvancedStat">Win Rate</div>
            <div className="AdvancedStat">Total Games</div>
          </div>
          {this.props.players.sort((a, b) => { return b.MMR - a.MMR }).map((player, index) => {
            return <div className="Stats__row" key={player.Id}>
              <div className="Rank">{index + 1}</div>
              <div className="ExtraFlex">{(player.Premium === 1)&&<Icon><FlashIcon /></Icon>}{player.Nickname} ({player.Name} {player.LastName})</div>
              <div className="">{player.MMR}</div>
              <div className="AdvancedStat">{Math.round(player.Victories / player.Games * 100) || 0}%</div>
              <div className="AdvancedStat">{player.Games || 0}</div>

            </div>
          })}
        </div>
      </div>
    );
  }
}

export default Stats;
