import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { getLuggageList, editLuggageData } from '../../redux/luggage/actions';
import MaterialDialog from '../material-components/dialog-window';
import LuggagePopupContent from './luggage-popup-content';
import './index.scss';

function LuggagePage({ getLuggageList, luggageList, editLuggageData }) {
  LuggagePage.propTypes = {
    getLuggageList: PropTypes.func.isRequired,
    luggageList: PropTypes.array.isRequired,
    editLuggageData: PropTypes.func.isRequired,
  };

  useEffect(() => {
    getLuggageList();
  }, []);

  return (
    <section className="luggage-list">
      {luggageList.map(({ _id, kg, price }, index) => (
        <div
          key={_id}
          className="luggage-list-item"
        >
          <div className={`luggage-list-item__${index}-image luggage-list-item__image`} />

          <span className="luggage-list-item__info">
            Kg: <span className="luggage-list-item__info-value">{kg}</span>
          </span>
          <span className="luggage-list-item__info">
            Price: <span className="luggage-list-item__info-value">{price}</span>
          </span>

          {!!kg && (
            <MaterialDialog
              title="Edit luggage type"
              buttonComponent={(
                <button
                  type="button"
                  className="button"
                >
                  Edit
                  <FaPencilAlt className="luggage-list-item__button-icon" />
                </button>
              )}
            >
              <LuggagePopupContent
                id={_id}
                kg={kg}
                price={price}
                buttonName="Edit"
                action={editLuggageData}
              />
            </MaterialDialog>
          )}
        </div>
      ))}
    </section>
  );
}

const mapStateToProps = state => ({
  luggageList: state.luggageData.luggageList
});

const mapDispatchToProps = dispatch => ({
  getLuggageList: () => dispatch(getLuggageList()),
  editLuggageData: luggageData => dispatch(editLuggageData(luggageData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LuggagePage);
