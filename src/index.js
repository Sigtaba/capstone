import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import YTSearch from 'youtube-api-search';
import Search from './components/Search';
import Results from './components/Results';
import VideoDetails from './components/VideoDetails';
import Login from './components/Login';
import firebase, { auth, provider } from './components/Firebase';
const API_KEY = 'AIzaSyBrFr4VoKtr7mJYbq1TcSTwxNjYfb9TTag';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      user: null
    };

    this.videoSearch('comedy');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

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

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref(this.state.user.displayName);
    const item = {
      videoDetails: this.state.selectedVideo
    }

    itemsRef.push(item);
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500)

    return (
      <div>
        <div className="navbar">
          {this.state.user ?
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
              <h3>Welcome {this.state.user.displayName}</h3>
              <button onClick={this.logout}>Log Out</button>
            </div>
            :
            <button onClick={this.login}>Log In</button>
          }
        </div>
        <VideoDetails video={this.state.selectedVideo} />
        <button onClick={this.handleSubmit}>Save Video</button>
        <Search onSearchTermChange={videoSearch} />
        <Results
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
