import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      username: '',
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
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      user: this.state.username,
      video: this.state.selectedVideo
    }
    itemsRef.push(item);
    this.setState({
      username: '',
      selectedVideo: ''
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500)

    return (
      // console.log({this.state.selectedVideo.id.videoId})

      <div>
        <div className="navbar">
          {this.state.user ?
            <button onClick={this.logout}>Log Out</button>
            :
            <button onClick={this.login}>Log In</button>
          }
        </div>
        <VideoDetails video={this.state.selectedVideo} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={this.state.username} />
          <button>Add video</button>
        </form>
        <Search onSearchTermChange={videoSearch} />
        <Results
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
