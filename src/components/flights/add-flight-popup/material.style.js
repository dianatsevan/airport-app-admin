const styles = theme => ({
  selectField: {
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: '10px',
  },
  textField: {
    marginBottom: '10px',
    backgroundColor: theme.palette.common.white,
    width: 200,
  },
  dialogButton: {
    backgroundColor: '#efefef',
    '&:hover': {
      backgroundColor: '#dbdbdb'
    }
  }
});

export default styles;
