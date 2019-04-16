import React from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import './index.scss';

export default function AirportsList() {
  const airports = [
    {
      code: 'AAA',
      name: 'Abakan'
    },
    {
      code: 'AMA',
      name: 'Mala Mala'
    },
    {
      code: 'ATA',
      name: 'Antalia'
    },
    {
      code: 'AAA',
      name: 'Abakan'
    },
    {
      code: 'AMA',
      name: 'Mala Mala'
    },
    {
      code: 'ATA',
      name: 'Antalia'
    }
  ];

  return (
    <section className="airports-list">
      <table className="airports-list__table">
        <tbody>
          <tr className="airports-list__header">
            <th>code</th>
            <th>name</th>
            <th></th>
            <th></th>
          </tr>
          {airports.map(({code, name}, index) => (
            <tr
              key={index}
              className="airports-list__item"
            >
              <td>{code}</td>
              <td>{name}</td>
              <td className="airports-list__icon">
                <FaPencilAlt />
              </td>
              <td className="airports-list__icon">
                <FaTimes />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}