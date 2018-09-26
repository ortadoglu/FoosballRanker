import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Select from 'react-select';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './team.css';

class Selector extends Component {
  render() {
    return (
      <Dialog
        fullScreen
        disableBackdropClick
        disableEscapeKeyDown
        open={this.props.state}
      >
        <DialogTitle>Pick the player</DialogTitle>
        <DialogContent>
          <Select
            onChange={this.props.selected}
            options={this.props.players}
            getOptionValue={(option) => (option['Name'])}
            getOptionLabel={(option) => (option['Name']) + ' ' + (option['LastName'])}
            menuIsOpen={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.selected} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    );
  }
}

export default Selector;
