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
              selectedItem: items[item],
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
            currentUserId: auth.currentUser.uid,
            currentUserImg: auth.currentUser.photoURL,
            currentUserEmail:
            auth.currentUser.email,
          }, () => { this.setState({selectedUserVideo: this.state.items[0]}); });
        });
        console.log("hey there" + auth.currentUser);
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
          <h2><span id="header-title-span">TUBE</span>TUBE</h2>
          <div className="userHeader">
            <Link to={`/search`}>
              <img className="icon" src={require(`../../images/search.png`)} />
            </Link>
            <Link to={`/`}>
              <img className="icon" src={require(`../../images/logout.png`)} />
            </Link>
          </div>
        </div>
        <div>
          <div className="profile">
          <img className="profile-pic" src={this.state.currentUserImg} />
            <div>
            <h3>{this.state.currentUser}</h3>
            <h3>{this.state.currentUserEmail}</h3>
            </div>
          </div>
        </div>
        <UserVideoDetails userVideo={this.state.selectedUserVideo}/>
        <UserResults
          onUserVideoSelect={selectedUserVideo => this.setState({selectedUserVideo}) }
          userVideos={this.state.items}
          user = {this.state.currentUserId}
          />
      </div>
    );
  }
}
export default UserMain;
