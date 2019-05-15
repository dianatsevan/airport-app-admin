import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import MaterialDialog from '../../material-components/dialog-window';
import AddPlanePopupContent from '../add-plane-popup/add-plane-popup-content';
import PlaneLayout from '../add-plane-popup/plane-layout';
import { editPlaneData } from '../../../redux/planes/actions';
import validate from './validate';
import './index.scss';

function PlanesList({ planesList }) {
  PlanesList.propTypes = {
    planesList: PropTypes.array.isRequired,
    editPlaneData: PropTypes.func.isRequired
  };

  return (
    <section className="planes-list">
      {planesList.map(({ _id, code, rowsNumber, seatsInRow }, index) => (
        <section
          key={index}
          className="planes-list-item"
        >
          <div className="planes-list-item__header">
            <span className="planes-list-item__info">
              Code: <span className="planes-list-item__info-value">{code}</span>
            </span>
            <span className="planes-list-item__info">
              Rows number: <span className="planes-list-item__info-value">{rowsNumber}</span>
            </span>
          </div>

          <div className="planes-list-item__plane">
            <PlaneLayout
              rows={3}
              location={seatsInRow}
            />
          </div>

          <div className="planes-list-item__buttons-wrapper">
            <MaterialDialog
              title="Edit plane"
              buttonComponent={(
                <button
                  type="button"
                  className="button planes-list-item__buttons"
                >
                  Edit
                  <FaPencilAlt className="planes-list-item__button-icon" />
                </button>
              )}
            >
              <AddPlanePopupContent
                id={_id}
                code={code}
                rowsNumber={rowsNumber}
                seatsInRow={seatsInRow}
                actionName="edit"
                buttonName="Edit plane"
                action={this.props.editPlaneData}
                validate={validate}
              />
            </MaterialDialog>
            <button type="button" className="button planes-list-item__buttons">
              Delete
              <FaTrashAlt className="planes-list-item__button-icon" />
            </button>
          </div>
        </section>
      ))}
    </section>
  );
}

const mapStateToProps = state => ({
  planesList: state.planesData.planesList
});

const mapDispatchToProps = dispatch => ({
  editPlaneData: planeData => dispatch(editPlaneData(planeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanesList);
