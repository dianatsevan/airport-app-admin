import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

export default function PlaneLayout({ rows, location, soldSeats }) {
  PlaneLayout.propTypes = {
    rows: PropTypes.number.isRequired,
    location: PropTypes.array.isRequired,
    soldSeats: PropTypes.array,
  };

  const drawSeatsRows = (arrayByRows) => arrayByRows.map((elem, index) => (
    <div key={elem + index} className="plane__seats-row">
      {location.map((place, j) => {
        const id = index + 1 + location[j];
        const isSold = soldSeats && soldSeats.some(seat => seat === id);
        return (place
          ? (
            <div
              id={id}
              key={index + j + elem}
              className={classNames({
                plane__seat: true,
                plane__seat_sold: isSold,
              })}
              // className="plane__seat"
            />
          )
          : <div key={index + j + elem} className="empty">{index + 1}</div>
        )
      })}
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
