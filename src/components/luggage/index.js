import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        <MaterialDialog
          key={index}
          title="Edit luggage type"
          buttonComponent={(
            <div
              key={item._id}
              className="luggage-list-item"
            >
              <div className={`luggage-list-item__${index}-image luggage-list-item__image`} />
              <span>KG: {item.kg}</span>
              <span>PRICE: {item.price}</span>
            </div>
          )}
        >
          <LuggagePopupContent
            kg={item.kg}
            price={item.price}
            buttonName="Edit"
          />
        </MaterialDialog>
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
