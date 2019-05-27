const styles = theme => ({
  formField: {
    marginBottom: '10px',
    backgroundColor: 'transparent',
    width: '100%',
  },
  menuItem: {
    height: 'auto'
  },
  expPanel: {
    width: 'auto',
    boxShadow: 'none',
    borderRadius: '3px',
    border: '1px solid lightgray',
    marginBottom: '10px',

    '&:hover': {
      border: '1px solid black',
    }
  },
  expPanelSummary: {
    paddingLeft: '13px',
    height: '56px',
    width: 'auto',
    color: 'gray',
    fontWeight: '300'
  },
  datePicker: {
    [theme.breakpoints.up('sm')]: {
      width: '49%',
    },
  },
  timePicker: {
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
  },
  rightNotchedOutline: {
    borderRadius: '3px 0 0 3px'
  },
  leftNotchedOutline: {
    borderRadius: '0 3px 3px 0'
  },
});

export default styles;