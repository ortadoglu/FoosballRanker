import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ThumbsIcon from '@material-ui/icons/ThumbsUpDown';
import PeopleIcon from '@material-ui/icons/People';
import TrendingUp from '@material-ui/icons/TrendingUp';

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.updateMain(value);
  };

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation className="Navigation"
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="Game on!" icon={<ThumbsIcon />} />
        <BottomNavigationAction label="Rankings" icon={<TrendingUp />} />
        <BottomNavigationAction label="New Player" icon={<PeopleIcon />} />
      </BottomNavigation>
    );
  }
}

export default SimpleBottomNavigation;