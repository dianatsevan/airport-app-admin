import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FaGlobeAmericas, FaSuitcaseRolling } from 'react-icons/fa';
import { MdFlightTakeoff, MdFlight } from 'react-icons/md';
import AppHeader from '../app-header';
import styles from './material.styles';
import './index.scss';

const linkList = [{
  path: '/app/airports',
  text: 'Airports',
  icon: <FaGlobeAmericas className="side-menu__icon" />
},
{
  path: '/app/flights',
  text: 'Flights',
  icon: <MdFlightTakeoff className="side-menu__icon" />
},
{
  path: '/app/planes',
  text: 'Planes',
  icon: <MdFlight className="side-menu__icon" />
},
{
  path: '/app/luggage',
  text: 'Luggage',
  icon: <FaSuitcaseRolling className="side-menu__icon" />
}
];

class SideMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  state = {
    opened: false
  };

  drawerClassNames = classes => classNames(classes.drawer, {
    [classes.drawerOpen]: this.state.opened,
    [classes.drawerClose]: !this.state.opened,
  });

  paperClassNames = classes => classNames({
    [classes.drawerOpen]: this.state.opened,
    [classes.drawerClose]: !this.state.opened,
  });

  linkList = () => linkList.map(({ path, text, icon }, index) => (
    <Link
      key={index + text}
      to={path}
      className="side-menu__link"
    >
      <ListItem button key={text}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  ));

  handleDrawerOpen = () => this.setState({ opened: true });

  handleDrawerClose = () => this.setState({ opened: false });

  render() {
    const { classes, theme, children } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppHeader
          classes={classes}
          isOpen={this.state.opened}
          handleClick={this.handleDrawerOpen}
        />

        <Drawer
          variant="permanent"
          className={this.drawerClassNames(classes)}
          classes={{ paper: this.paperClassNames(classes) }}
          open={this.state.opened}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.linkList()}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SideMenu);
