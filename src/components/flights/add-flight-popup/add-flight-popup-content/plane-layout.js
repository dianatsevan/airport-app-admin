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

  const arrayByRows = new Array(rows).fill(1);

  return (
    <div className="plane">
      {drawSeatsRows(arrayByRows)}
    </div>
  );
}
