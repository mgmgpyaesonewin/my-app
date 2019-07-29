import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loginSuccessful: false,
  };

  handleChangeEmail = event => this.setState({ email: event.target.value });
  handleChangePassword = event => this.setState({ password: event.target.value });

  handleLogin = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const response = await axios.post(`https://reqres.in/api/login`,{ 
      email,
      password,
    });
    const {token} = response.data;
    if(token) {
      localStorage.setItem('token', response.data.token);
      this.setState({ loginSuccessful: true });
    }
  };

  render() {
    const { email, password, loginSuccessful } = this.state;
    if (loginSuccessful) {
      return <Redirect to='/detail' />
    }
    return (
      <div>
        <section className="hero is-primary is-fullheight">
          <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form className="box" onSubmit={this.handleLogin}>
                <div className="field">
                  <label className="label">Email</label>
                    <div className="control">
                    <input 
                      type="email" 
                      placeholder="e.g. bobsmith@gmail.com" 
                      className="input" 
                      required
                      onChange={this.handleChangeEmail} 
                      value={email} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input 
                      type="password" 
                      placeholder="*******" 
                      className="input" 
                      required
                      onChange={this.handleChangePassword} 
                      value={password} />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-success">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
    );
  }
}

export default Login;
