import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { getFlightsData, setFlightsData, setSelectedFlightData, getFlightOrdersData, deleteFlight } from '../../../redux/flights/actions';
import EnhancedTableHead from './table-head';
import EnhancedTableToolbar from './tool-bar';
import styles from './material.style';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'code', label: 'Flight code' },
  { id: 'fromCountry', label: 'From' },
  { id: 'toCountry', label: 'To' },
];

class EnhancedTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    flightsList: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    getFlightsData: PropTypes.func.isRequired,
    setSelectedFlightData: PropTypes.func.isRequired,
    getFlightOrders: PropTypes.func.isRequired,
    deleteFlight: PropTypes.func.isRequired,
    flightOrders: PropTypes.array.isRequired,
  };

  state = {
    order: 'asc',
    orderBy: '',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    selectedFlight: '',
    isAllFlightsCheckboxSelected: true,
  };

  componentDidMount = () => this.props.getFlightsData();

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    this.setState(state => ({ isAllFlightsCheckboxSelected: !state.isAllFlightsCheckboxSelected }));
    if (this.state.isAllFlightsCheckboxSelected && event.target.checked) {
      const availableFlights = this.props.flightsList.filter(flight => flight.flightOrders.length === 0);
      this.setState({ selected: availableFlights.map(n => n._id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleSelecteOneClick = (event, name) => {
    const { selected } = this.state;
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    event.stopPropagation();
  }

  handleClick = (event, id) => {
    const selectedFlight = this.props.flightsList.filter(flight => flight._id === id);
    this.props.setSelectedFlightData(selectedFlight[0]);
    this.props.history.push(`/app/flights/${id}`);
  };

  handleChangePage = (event, page) => this.setState({ page });

  handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value });

  handleDeleteIconClick = () => {
    this.state.selected.forEach(oneSelected => this.props.deleteFlight(oneSelected));
    this.setState({ selected: [] });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, flightsList } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, flightsList.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onTrashBinClick={this.handleDeleteIconClick}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={flightsList.length}
              rows={rows}
              flightsList={flightsList}
            />
            <TableBody>
              {stableSort(flightsList, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(flight => {
                  const isSelected = this.isSelected(flight._id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, flight._id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={flight._id}
                      selected={isSelected}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        {!flight.flightOrders.length && (
                          <Checkbox
                            checked={isSelected}
                            onClick={event => this.handleSelecteOneClick(event, flight._id)}
                          />
                        )}
                      </TableCell>
                      <TableCell>{flight.code}</TableCell>
                      <TableCell>{flight.fromCountry.name}</TableCell>
                      <TableCell>{flight.toCountry.name}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={flightsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  flightsList: state.flightsData.flightsList,
  flightOrders: state.flightsData.flightOrders,
  selectedFlight: state.flightsData.selectedFlight
});

const mapDispatchToProps = dispatch => ({
  getFlightsData: () => dispatch(getFlightsData()),
  setSelectedFlightData: payload => dispatch(setSelectedFlightData(payload)),
  getFlightOrders: flightId => dispatch(getFlightOrdersData(flightId)),
  deleteFlight: ids => dispatch(deleteFlight(ids)),
  setFlightsData: flightsData => dispatch(setFlightsData(flightsData))
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EnhancedTable);
