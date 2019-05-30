const styles = theme => ({
  root: {
    width: '60%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer'
  }
});

export default styles;
