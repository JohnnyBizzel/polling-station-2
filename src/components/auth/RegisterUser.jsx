import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const RegistrationForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <div className="container">
    <div className="row">
      <section className="col-xs-12 col-md-8">
        <form className="form-horizontal"  action="/" onSubmit={onSubmit}>
          <h2 className="card-heading">Register to create polls</h2>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.summary && <p className="error-message bg-warning text-danger">{errors.summary}</p>}

          <div id="fgName" className="form-group">
            <label className="col-sm-2 col-md-4 control-label" htmlFor="inputName">Name</label>
              <div className="col-sm-6">
                  <input id="inputName" 
                    type="text" 
                    className="form-control" 
                    placeholder="Your name" 
                    name="name" required 
                    aria-describedby="nameStatus" 
                    onChange={onChange}
                    value={user.name} />                   
              </div>
          </div>
          <div id="fgEmail" className="form-group has-feedback">
              <label htmlFor="inputEmail" className="col-sm-2 col-md-4 control-label">E-mail</label>
              <div className="col-sm-6">
                  <input id="inputEmail" 
                    type="email" 
                    className="form-control" 
                    placeholder="Email address" 
                    name="email" 
                    onChange={onChange}
                    value={user.email}
                    required />
              </div>
          </div>
          <div className="form-group">
              <label htmlFor="password" className="col-sm-2 col-md-4 control-label">Password (6 char min)</label>
              <div className="col-sm-6">
                  <input 
                    id="inputPassword"
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    name="password" 
                    onChange={onChange}
                    value={user.password}
                    required />
              </div>
          </div>
          <div className="form-group">
              <label htmlFor="password2" className="col-sm-2 col-md-4 control-label">Confirm Password</label>
              <div className="col-sm-6">
                  <input 
                    id="inputPassword2" 
                    type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    name="password2"
                    onChange={onChange}
                    value={user.password2} 
                    required />
              </div>                    
          </div>
          <div className="form-group">
              <div className="col-sm-8 col-sm-offset-2">
                  <button id="btnSubmit" type="submit" className="btn btn-default">Submit</button>
              </div>
          </div>
          
        <div>Don't have an account? <a href='/user/register'>Create one</a>.</div>
        </form>
      </section>
    </div>
  </div>
);

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default RegistrationForm;