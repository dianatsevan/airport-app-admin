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
import { daysOfWeek } from '../../../../constants';

function ScheduleTable({ classes, schedule }) {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Day</TableCell>
          <TableCell>Departure time</TableCell>
          <TableCell>Arrival time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {schedule.map(day => (
          <TableRow key={day.dayOfWeek}>
            <TableCell>{daysOfWeek[day.dayOfWeek - 1]}</TableCell>
            <TableCell>{moment(day.departureTime).format('LT')}</TableCell>
            <TableCell>{moment(day.arrivalTime).format('LT')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

ScheduleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  schedule: PropTypes.array.isRequired,
};

export default withStyles(styles)(ScheduleTable);
