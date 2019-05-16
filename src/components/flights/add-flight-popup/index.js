import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MaterialDialog from '../../material-components/dialog-window';
import AddFlightPopupContent from './add-flight-popup-content';
import styles from './material.style';
// import { getAirportsToAdd, addAirportsToDb } from '../../../redux/airports/actions';
// import './index.scss';

class AddFlightPopup extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MaterialDialog
          title="Add flight"
          buttonComponent={(
            <Button className={classes.dialogButton} variant="outlined" color="primary">
              Add flight
            </Button>
          )}
        >
          <AddFlightPopupContent
            classes={classes}
          />
        </MaterialDialog>
      </div>
    )
  }
}

export default withStyles(styles)(AddFlightPopup);
