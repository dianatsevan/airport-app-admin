import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default function PlaneLayout({ rows, location }) {
  PlaneLayout.propTypes = {
    rows: PropTypes.number.isRequired,
    location: PropTypes.array.isRequired,
  };

  const drawSeatsRows = (arrayByRows) => arrayByRows.map((elem, index) => (
    <div key={elem + index} className="plane__seats-row">
      {location.map((place, j) => (place
        ? (
        <div
          id={index + location[j] + 1}
          key={index + j + elem}
          className="plane__seat"
        />
      )
        : <div key={index + j + elem} className="empty">{index + 1}</div>
      ))}
    </div>
  ));

  const drawSignsRow = () => location.map((sign, index) => (
    <div key={sign + index} className={sign ? 'sign plane__seat' : 'empty'}>
      {sign && <span className="sign seat">{sign}</span>}
    </div>
  ));

  const arrayByRows = new Array(rows).fill(1);

  return (
    <div className="plane">
      <div className="plane__exit plane__exit_front" />

      <div className="plane__seats-row">
        {drawSignsRow()}
      </div>

      {drawSeatsRows(arrayByRows)}

      <div className="plane__exit plane__exit_back" />
    </div>
  );
}
