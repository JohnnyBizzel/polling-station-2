// used by utils/login.js

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import { Card, CardText } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message bg-warning text-danger">{errors.summary}</p>}

      <div className="form-group">
        <input
          className="form-control col-sm-6"
          placeholder="E-mail"
          name="email"
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="form-group">
        <input 
          className="form-control col-sm-6"
          placeholder="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-default" label="Log in">Log in</button>
      </div>

      <div>Don't have an account? <a href='/user/register'>Create one</a>.</div>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;