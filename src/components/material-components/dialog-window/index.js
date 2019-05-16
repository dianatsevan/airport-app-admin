import React from 'react';
import PropTypes from 'prop-types';
import SimpleDialogWrapped from './simple-dialog';

class MaterialDialog extends React.Component {
  static propTypes = {
    buttonComponent: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
  }

  state = {
    opened: false,
  };

  handleClickOpen = () => this.setState({ opened: true });

  handleClose = () => this.setState({ opened: false });

  render() {
    const { buttonComponent: ButtonComponent } = this.props;

    return (
      <div>
        <span onClick={this.handleClickOpen}>
          {ButtonComponent}
        </span>
        <SimpleDialogWrapped
          open={this.state.opened}
          onClose={this.handleClose}
          title={this.props.title}
        >
          {this.props.children}
        </SimpleDialogWrapped>
      </div>
    );
  }
}

export default MaterialDialog;
