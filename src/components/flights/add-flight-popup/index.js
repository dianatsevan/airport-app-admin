import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { addFlightToDb } from '../../../redux/flights/actions';
import MaterialDialog from '../../material-components/dialog-window';
import AddFlightPopupContent from './add-flight-popup-content';
import styles from './material.style';

class AddFlightPopup extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addFlightToDb: PropTypes.func.isRequired,
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
            action={this.props.addFlightToDb}
          />
        </MaterialDialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addFlightToDb: planeInfo => dispatch(addFlightToDb(planeInfo))
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(AddFlightPopup);
