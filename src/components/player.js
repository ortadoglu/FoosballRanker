import React, { Component } from 'react';
import './player.css'
import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/FindReplace';
import CompareIcon from '@material-ui/icons/CompareArrows';

class Player extends Component {
  render() {
    return (
      <div className="Player">
        <div className="">{this.props.name}</div>
        <div className="">{this.props.mmr}</div>
        <IconButton aria-label="Delete" onClick={this.props.setPlayer}>
          <CompareIcon />
        </IconButton>
      </div>
    );
  }
}

export default Player;

