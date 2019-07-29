import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Detail extends Component {

  state = {
    itemList:[],
    authorize: false
  };

  componentWillMount() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      this.setState({ authorize: true });
    }
  }
  componentDidMount() {
    this.getItemList();
  }

  async getItemList() {
    const response = await axios.get(`https://api.myjson.com/bins/10aaj2`);
    console.log(response.data.data.space_list);
    this.setState({ itemList: response.data.data.space_list });
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    const { itemList,authorize } = this.state;
    if (!authorize) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-primary" onClick={this.handleLogout}>
                    <strong>Logout</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="container">
        <section className="section">
          <div className="container">
            <div className="columns is-multiline is-mobile">
            { itemList.map((item => (
                <div className="column is-2-desktop is-3-tablet is-half-mobile" key={item.space_id}>
                  <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={item.space_thumb_image} alt="Placeholder" />
                    </figure>
                  </div>
                    <div className="card-content">
                      <div className="content">
                        <h6 className="title is-6">{item.space_name}</h6>
                        <p>{item.type_name}</p>
                        <p><b>{item.base_price}$</b>&nbsp;/ day</p>
                      </div>
                    </div>
                  </div>
                </div>
            )))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };
}
export default Detail;
