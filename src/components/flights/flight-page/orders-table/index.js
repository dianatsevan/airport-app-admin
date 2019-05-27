import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './material.style.js';

function OrdersTable({ classes, orders, date }) {
  const drawTableHead = () => ['Code', 'First name', 'Last name', 'Seats']
    .map(name => <TableCell key={name}>{name}</TableCell>);

  const drawTableBody = () => orders.map(({ _id, departureDate, user, passengersInfo }) => {
    if (!date || date === moment(departureDate).format('L')) {
      return (
        <TableRow key={_id}>
          <TableCell>{_id.slice(-4)}</TableCell>
          <TableCell>{user.firstName}</TableCell>
          <TableCell>{user.lastName}</TableCell>
          <TableCell>{passengersInfo.map(({ selectedSeat }) => `${selectedSeat} `)}</TableCell>
        </TableRow>
      );
    }
  });

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {drawTableHead()}
        </TableRow>
      </TableHead>
      <TableBody>
        {drawTableBody()}
      </TableBody>
    </Table>
  );
}

OrdersTable.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
};

export default withStyles(styles)(OrdersTable);
