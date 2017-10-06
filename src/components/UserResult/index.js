import React from 'react';
import firebase, { auth, provider } from '../Firebase';
import './styles.css';

class UserResult extends React.Component {
  constructor(props) {
    super(props);
  };

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/${this.props.user}/${itemId}`);
    itemRef.remove();
  }


  render() {
    const imageUrl = this.props.video.imageUrl;
    return (
      <li onClick={() => this.props.onUserVideoSelect(this.props.video)} className="user list-group-item">
        <div className="video-list media">
          <div className="media-left">
            <img className="media-object" src={imageUrl} />
            <div className="media-body">
              <div className="media-heading">{this.props.video.title}</div>
              <div className="media-heading">{this.props.video.channel}</div>
            </div>
          </div>

          <div className="remove-button" onClick={() => this.removeItem(this.props.video.id)}><img className="icon" src={require(`../../images/remove.png`)} /></div>
        </div>
      </li>
    );
  }


};

export default UserResult;
