import React from 'react';
import UserResults from '../UserResults';
import UserVideoDetails from '../UserVideoDetails';
import firebase, { auth, provider } from '../Firebase';
import { Link } from 'react-router-dom';
import './styles.css';


class UserMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedUserVideo: null,
      currentUser: null
    };
  }


  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });

        const itemsRef = firebase.database().ref(auth.currentUser.uid);
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].videoDetails.snippet.title,
              channel: items[item].videoDetails.snippet.channelTitle,
              imageUrl: items[item].videoDetails.snippet.thumbnails.high.url,
              videoId: items[item].videoDetails.id.videoId,
              videoDescription: items[item].videoDetails.snippet.description,
              userId: auth.currentUser.displayName
            });
          }
          this.setState({
            items: newState,
            currentUser: auth.currentUser.displayName,
            currentUserImg: auth.currentUser.photoURL,
          }, () => { this.setState({selectedUserVideo: this.state.items[0]}); });
        });
      }
      else {
        this.setState({
          items: []
        })
      }
    });
  }

  render() {
    return (
      <div className="header-container">
        <div className="header2">
          <div className="header-left">
            <img className="profile-pic" src={this.state.currentUserImg} />
            <h3>Welcome {this.state.currentUser}</h3>
          </div>
          <div className="header-right">
            <Link to={`/search`}>
              <button>Search</button>
            </Link>
            <Link to={`/`}>
              <button>Logout</button>
            </Link>
          </div>
        </div>
        <UserVideoDetails userVideo={this.state.selectedUserVideo} />
        <UserResults
          onUserVideoSelect={selectedUserVideo => this.setState({selectedUserVideo}) }
          userVideos={this.state.items} />
      </div>
    );
  }
}
export default UserMain;
