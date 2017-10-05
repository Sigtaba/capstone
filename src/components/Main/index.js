import _ from 'lodash';
import React from 'react';
import Search from '../Search';
import Results from '../Results';
import VideoDetails from '../VideoDetails';
import YTSearch from 'youtube-api-search';
import firebase, { auth, provider } from '../Firebase';
import { Link } from 'react-router-dom';
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
      YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
         });
      });
    }

    handleSubmit() {
      // e.preventDefault();
      console.log(auth.currentUser.uid);
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
          <VideoDetails video={this.state.selectedVideo} />
          <Link to={`/user`}>
            <button onClick={this.handleSubmit}>Save Video</button>
          </Link>
          <Search onSearchTermChange={videoSearch} />
          <Results
            onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
            videos={this.state.videos} />
        </div>
      );
    }
}
export default Main;
