import React from 'react';
import UserResults from '../UserResults';
import UserVideoDetails from '../UserVideoDetails';
import firebase, { auth, provider } from '../Firebase';


class UserMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedUserVideo: null
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

  render() {
    return (
      <div>
        <UserVideoDetails userVideo={this.state.selectedUserVideo} />
        <UserResults
          onUserVideoSelect={selectedUserVideo => this.setState({selectedUserVideo}) }
          userVideos={this.state.items} />
      </div>
    );
  }
}
export default UserMain;
