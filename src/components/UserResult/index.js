import React from 'react';

const UserResult = ({video, onUserVideoSelect }) => {
  const imageUrl = video.imageUrl;

  return (
    <li onClick={() => onUserVideoSelect(video)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>
        <div className="media-body">
          <div className="media-heading">{video.title}</div>
        </div>
      </div>
    </li>
  );
};

export default UserResult;
