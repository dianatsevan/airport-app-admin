import React from 'react';
import './index.scss';

function PlaneSeats({
  rows, location
}) {
  const rowss = new Array(rows).fill(1);

  return (
    rowss.map((elem, index) => (
      <div key={index} className="row seats">
        {location.map((place, j) => {
          const id = index + 1 + location[j];
          return (place ? (
            <div
              id={id}
              key={index + j}
              className="seat"
            />
          )
            : <div key={Math.random()} className="empty">{index + 1}</div>);
        })}
      </div>
    ))
  );
}

export default PlaneSeats;
