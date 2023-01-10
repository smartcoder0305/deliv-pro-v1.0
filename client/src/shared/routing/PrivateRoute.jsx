import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../../components/layout/Loading';

const PrivateRoute = ({
  component: Component,
  auth: {isAuthenticated, loading},
}) => {
  if(loading) {
    return <Loading />;
  }
  if (isAuthenticated) {
    return <Component />;
  }

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
