import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { getLuggageList } from '../../redux/luggage/actions';
import MaterialDialog from '../material-components/dialog-window';
import LuggagePopupContent from './luggage-popup-content';
import './index.scss';

function LuggagePage({ getLuggageList, luggageList }) {
  LuggagePage.propTypes = {
    getLuggageList: PropTypes.func.isRequired,
    luggageList: PropTypes.array.isRequired,
  };

  useEffect(() => {
    getLuggageList();
  }, []);

  return (
    <section className="luggage-list">
      {luggageList.map((item, index) => (
        <div
          key={item._id}
          className="luggage-list-item"
        >
          <div className={`luggage-list-item__${index}-image luggage-list-item__image`} />

          <span className="luggage-list-item__info">
            Kg: <span className="luggage-list-item__info-value">{item.kg}</span>
          </span>
          <span className="luggage-list-item__info">
            Price: <span className="luggage-list-item__info-value">{item.price}</span>
          </span>

          <div className="luggage-list-item__buttons-wrapper">
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
                kg={item.kg}
                price={item.price}
                buttonName="Edit"
              />
            </MaterialDialog>
            <button
              type="button"
              className="button"
              // onClick={handleDeleteButtonClick(_id)}
            >
              Delete
              <FaTrashAlt className="planes-list-item__button-icon" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

const mapStateToProps = state => ({
  luggageList: state.luggageData.luggageList
});

const mapDispatchToProps = dispatch => ({
  getLuggageList: () => dispatch(getLuggageList())
});

export default connect(mapStateToProps, mapDispatchToProps)(LuggagePage);
