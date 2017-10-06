import React from 'react';
import firebase, { auth, provider } from '../Firebase';
import './styles.css';

const UserVideoDetails = ({userVideo}) => {
  if (!userVideo) {


    return (
      <div className="video-detail col-md-8">
      </div>
    );
  }

  const userVideoId = userVideo.videoId;
  const url = `https://www.youtube.com/embed/${userVideoId}`;

  return (
    <div className="video-details">
      <div className="videoWrapper">
        <iframe src={url}></iframe>
      </div>
      <div className="details">
        <h3 className="video-title">{userVideo.title}</h3>
        <p className="video-channel">Uploaded by: {userVideo.channel}</p>
        <p className="video-description">{userVideo.videoDescription}</p>
      </div>
    </div>
  );
};





export default UserVideoDetails;
