import React from 'react';

const UserVideoDetails = ({userVideo}) => {
  if (!userVideo) {
    return (
      <div></div>
    );
  }

  const userVideoId = userVideo.videoId;
  const url = `https://www.youtube.com/embed/${userVideoId}`;

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
      </div>
      <div className="details">
        <div>{userVideo.title}</div>
        <div>{userVideo.channel}</div>
      </div>
    </div>

  );
};

export default UserVideoDetails;
