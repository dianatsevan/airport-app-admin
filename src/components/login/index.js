import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FaUserCheck } from 'react-icons/fa';
// import { withSnackbar } from 'notistack';
// import { authoriseUser } from '../../redux/user/actions';
import styles from './material.style';
import TextField from '../material-components/text-field';
import validate from './validate';
import './index.scss';
// import '../../styles/button.scss';

class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // authoriseUser: PropTypes.func.isRequired,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = (values) => {
    // this.props.authoriseUser(values);
  };

  render() {
    const { classes } = this.props;

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
              <button className="button" type="submit">
                Login
              </button>

              <Link to="/register" className="login-form__register-link">Registration</Link>
            </div>
          </form>
        )}
      />
    );
  }
}


export default compose(
  withRouter,
  withStyles(styles)
)(Login);
// )(withSnackbar(Login));