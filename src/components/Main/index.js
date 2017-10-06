import _ from 'lodash';
import React from 'react';
import Search from '../Search';
import Results from '../Results';
import VideoDetails from '../VideoDetails';
import YTSearch from 'youtube-api-search';
import firebase, { auth, provider } from '../Firebase';
import { Link } from 'react-router-dom';
import './styles.css';
const API_KEY = 'AIzaSyBrFr4VoKtr7mJYbq1TcSTwxNjYfb9TTag';



class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('comedy');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    videoSearch(term) {
      YTSearch({key: API_KEY, term: term, maxResults: 20}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
         });
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      if (auth.currentUser) {
        const itemsRef = firebase.database().ref(auth.currentUser.uid);
        const item = {
          videoDetails: this.state.selectedVideo
        }
        itemsRef.push(item);
      }
      else {
        alert('Sign in to save videos!');
      }
    }

    render() {
      const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500)
      return (
        <div>
          <div className="header">
            <h2>TubeTube</h2>
            <div className="icons">
              <Link to={`/user`}>
                <img className="icon" src={require(`../../images/profile.png`)} />
              </Link>
              <Link to={`/`}>
                <img className="icon" src={require(`../../images/logout.png`)} />
              </Link>
            </div>
          </div>
          <VideoDetails video={this.state.selectedVideo} />
          <button className="save-video" onClick={this.handleSubmit}>Save Video</button>
          <hr/>
          <Search onSearchTermChange={videoSearch} />
          <Results
            onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
            videos={this.state.videos} />
        </div>
      );
    }
}
export default Main;
