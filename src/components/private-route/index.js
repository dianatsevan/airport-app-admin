import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../loader';

function PrivateRoute({ component: Component, isLoggedIn, isLoadingPage }, props) {
  PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoadingPage: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  const { ...rest } = props;

  const getElem = (props) => {
    if (isLoadingPage) {
      return <Loader />;
    }
    if (isLoggedIn) {
      return <Component {...props} />;
    }
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}
      />
    );
  };

  return (
    <Route
      {...rest}
      render={() => getElem(props)}
    />
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.systemData.isLoggedInUser,
  isLoadingPage: state.systemData.isLoadingPage
});

export default connect(mapStateToProps)(PrivateRoute);
