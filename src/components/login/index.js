import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FaUserCheck } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginUser } from '../../redux/system/actions';
import styles from './material.style';
import TextField from '../material-components/text-field';
import validate from './validate';
import './index.scss';
import '../../styles/button.scss';

class Login extends React.Component {
  static propTypes = {
    isLoggedInUser: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    isCheckingLoginData: PropTypes.bool.isRequired,
    isCheckingLoginDataError: PropTypes.bool.isRequired
  };

  goToTheNextPage = () => {
    const { state } = this.props.location;
    const fromPath = state ? state.from.pathname : '/app';
    if (this.props.isLoggedInUser) this.props.history.push(fromPath);
  }

  componentDidUpdate = () => this.goToTheNextPage();

  componentDidMount = () => this.goToTheNextPage();

  onSubmit = values => this.props.loginUser({ ...values, role: 'admin' });

  getButtonClassnames = () => classNames({
    button: true,
    button_disabled: this.props.isCheckingLoginData,
    button_errored: this.props.isCheckingLoginDataError
  })

  render() {
    const { classes, isCheckingLoginData } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__container">
              <FaUserCheck className="login-form__icon" />
              <h1 className="login-form__header">Login</h1>
              <Field
                name="email"
                component={TextField}
                className={classes.textField}
                type="email"
                label="Email"
                margin="dense"
                variant="outlined"
              />
              <Field
                name="password"
                component={TextField}
                className={classes.textField}
                type="password"
                label="Password"
                margin="dense"
                variant="outlined"
              />
              <div className="button-wrapper">
                <button
                  className={this.getButtonClassnames()}
                  type="submit"
                  disabled={isCheckingLoginData}
                >
                  login
                </button>
                {isCheckingLoginData && <CircularProgress size={24} className={classes.loader} />}
              </div>
            </div>
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedInUser: state.systemData.isLoggedInUser,
  isCheckingLoginData: state.systemData.isCheckingLoginData,
  isCheckingLoginDataError: state.systemData.isCheckingLoginDataError
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
