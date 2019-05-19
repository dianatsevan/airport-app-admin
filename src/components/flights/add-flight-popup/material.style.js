const styles = theme => ({
  selectField: {
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: '10px',
  },
  textField: {
    marginBottom: '10px',
    backgroundColor: theme.palette.common.white,
    width: '100%',
  },
  dateTimePicker: {
    marginBottom: '10px',
    backgroundColor: theme.palette.common.white,
    width: '50%'
  },
  rightNotchedOutline: {
    borderRadius: '3px 0 0 3px'
  },
  leftNotchedOutline: {
    borderRadius: '0 3px 3px 0'
  },
  dialogButton: {
    backgroundColor: '#efefef',
    '&:hover': {
      backgroundColor: '#dbdbdb'
    }
  }
});

export default styles;
