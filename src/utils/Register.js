import React, { PropTypes } from 'react';
import Auth from './Auth';
import RegisterUser from '../components/auth/RegisterUser.jsx';


class RegisterUserPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage: '',
      user: {
        name: '',
        email: '',
        password: '',
        password2: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const password2 = encodeURIComponent(this.state.user.password2);
    const name = encodeURIComponent(this.state.user.name);
    const formData = `name=${name}&email=${email}&password=${password}&password2=${password2}&username=''`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // save the token
        Auth.authenticateUser(xhr.response.token, xhr.response.user.name);

        console.log('Login.js - ', xhr.response.user.name);
        // change the current URL to /
        this.context.router.replace('/');
      } else {
        // failure
        // todo: Handle errors better (remove env.SECRECT to test)
        // change the component state
        const errors = xhr.response ? xhr.response.errors : { message : xhr.status };
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    console.log('render Register.js');
    return (
      <RegisterUser
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

RegisterUser.contextTypes = {
  router: PropTypes.object.isRequired
};

export default RegisterUserPage;