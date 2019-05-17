import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class SimpleDialog extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
  };

  handleClose = () => this.props.onClose();;

  handleListItemClick = value => this.props.onClose(value);

  render() {
    const { onClose, title, children, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <div>
          {children}
        </div>
      </Dialog>
    );
  }
}

export default SimpleDialog;
