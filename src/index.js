import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main';
import UserMain from './components/UserMain';
import Login from './components/Login';
import firebase, { auth, provider } from './components/Firebase';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      items: [],
      selectedVideo: null,
      selectedUserVideo: null,
      user: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }


//not sure what this does//
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  logout() {
  auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user.email;
        this.setState({
          user
        });
      });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500)
    return (
      <div>
        <Login currentUser={this.state.user} userLogin={this.login} userLogout={this.logout}/>
      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/search' component={Main}/>
        <Route exact path='/user' component={UserMain}/>
      </Switch>
    </div>
  </BrowserRouter>
),  document.querySelector('#root')
);
