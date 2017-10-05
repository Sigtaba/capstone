import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import YTSearch from 'youtube-api-search';
import Search from './components/Search';
import Results from './components/Results';
import VideoDetails from './components/VideoDetails';
import UserResults from './components/UserResults';
import UserVideoDetails from './components/UserVideoDetails';
// import Main from './components/Main';
import Login from './components/Login';
import firebase, { auth, provider } from './components/Firebase';
const API_KEY = 'AIzaSyBrFr4VoKtr7mJYbq1TcSTwxNjYfb9TTag';


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

    this.videoSearch('comedy');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log()

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });

        const itemsRef = firebase.database().ref(this.state.user.displayName);
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].videoDetails.snippet.title,
              channel: items[item].videoDetails.snippet.channelTitle,
              imageUrl: items[item].videoDetails.snippet.thumbnails.default.url,
              videoId: items[item].videoDetails.id.videoId
            });
          }
          this.setState({
            items: newState
          });
        });
      }
      else {
        this.setState({
          items: []
        })
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
    console.log(this.state.user.displayName);
    const item = {
      videoDetails: this.state.selectedVideo
    }
    itemsRef.push(item);
  }

  // removeItem(e) {
  //   e.preventDefault();
  //   const nameRef = firebase.database().ref(this.state.user.displayName);
  //   console.log(this.state.user.displayName);
  //   const itemRef = firebase.database().ref(`/${nameRef}/${item}`);
  //   itemRef.remove();
  // }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500)
    return (
      <div>
        <Login currentUser={this.state.user} userLogin={this.login} userLogout={this.logout}/>
        <VideoDetails video={this.state.selectedVideo} />
        <button onClick={this.handleSubmit}>Save Video</button>
        <Search onSearchTermChange={videoSearch} />
        <Results
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
        <UserVideoDetails userVideo={this.state.selectedUserVideo} />
        <button onClick={this.removeItem}>Remove Video</button>
        <UserResults
          onUserVideoSelect={selectedUserVideo =>      this.setState({selectedUserVideo}) }
          userVideos={this.state.items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
