import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '../../redux/notifier/actions';

class Notifier extends React.Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    removeSB: PropTypes.func.isRequired,
  };

  displayed = [];

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach((notification) => {
      if (this.displayed.includes(notification.key)) return;
      this.props.enqueueSnackbar(notification.message, notification.options);
      this.storeDisplayed(notification.key);
      this.props.removeSB(notification.key);
    });
  }

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = dispatch => ({
  removeSB: obj => dispatch(removeSnackbar(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSnackbar(Notifier));
