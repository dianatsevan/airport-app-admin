import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MaterialDialog from '../../material-components/dialog-window';
import AddPlanePopupContent from './add-plane-popup-content';
import { addPlaneToDb } from '../../../redux/planes/actions';
import validate from './validate';
import styles from './material.style';
import './index.scss';

function AddPlanePopup({ addPlaneToDb, classes }) {
  AddPlanePopup.propTypes = {
    classes: PropTypes.object.isRequired,
    addPlaneToDb: PropTypes.func.isRequired
  };

  return (
    <Fragment>
      <MaterialDialog
        title="Add plane"
        buttonComponent={(
          <Button variant="outlined" color="primary" className={classes.dialogButton}>
            Add plane
          </Button>
        )}
      >
        <AddPlanePopupContent
          actionName="add"
          validate={validate}
          action={addPlaneToDb}
          buttonName="Add plane"
        />
      </MaterialDialog>
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  addPlaneToDb: planeData => dispatch(addPlaneToDb(planeData))
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(AddPlanePopup);
