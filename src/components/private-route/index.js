import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../loader';

class PrivateRoute extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoadingPage: PropTypes.bool.isRequired
  }

  render () {
    const { component: Component, isLoggedIn, isLoadingPage, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          {
            return isLoadingPage ? (
              <Loader />
            ) : (
              isLoggedIn ? (
                <Component {...props} />
              ) : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: this.props.location }
                  }}
                />
              )
            )
          }
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.systemData.isLoggedInUser,
  isLoadingPage: state.systemData.isLoadingPage
});

export default connect(mapStateToProps)(PrivateRoute);