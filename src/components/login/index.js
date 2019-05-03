import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FaUserCheck } from 'react-icons/fa';
import { loginUser } from '../../redux/system/actions';
// import { withSnackbar } from 'notistack';
import styles from './material.style';
import TextField from '../material-components/text-field';
import validate from './validate';
import './index.scss';
import '../../styles/button.scss';

class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = values => {
    const newValues = {
      ...values,
      role: 'admin'
    };
    this.props.loginUser(newValues);
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
            </div>
          </form>
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(loginUser())
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(Login);
// )(withSnackbar(Login));
