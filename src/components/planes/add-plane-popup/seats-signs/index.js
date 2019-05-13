import React from 'react';
import PropTypes from 'prop-types';

export default function SeatsSigns({ signs }) {
  SeatsSigns.propTypes = {
    signs: PropTypes.array.isRequired,
  };

  return (
    <div className="row">
      {signs.map(sign => (sign
        ? <div key={Math.random()} className="sign seat"><span className="sign seat">{sign}</span></div>
        : <div key={Math.random()} className="empty" />))}
    </div>
  );
}
