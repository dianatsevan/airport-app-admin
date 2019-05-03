import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './index.scss';

const styles = theme => ({
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class SideMenu extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className='side-bar'>
        <Paper className={classes.paper}>
          <MenuList>
            <MenuItem>
              <Link to='/app/airports' className='side-bar__link'>
                Airports
              </Link>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);