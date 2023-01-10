import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => (
  <div className="fixed top-20 right-5 inline-block">
    {alerts.map((alert) => (
      <div key={alert.id} className={`px-3 py-2 my-2 opacity-90 shadow-lg animate-pulse text-white alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
)

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);