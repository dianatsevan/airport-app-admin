const styles = theme => ({
  paper: {
    width: '850px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    },
  },
  dateSelect: {
    width: '150px'
  },
  datePicker: {
    width: '150px'
  }
});

export default styles;
