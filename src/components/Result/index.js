import React from 'react';
import './styles.css';

const Result = ({video, onVideoSelect}) => {
  const imageUrl = video.snippet.thumbnails.high.url;


  return (
    <li onClick={() => onVideoSelect(video)} className="tiles">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>
        <div className="media-body">
          <div className="media-heading">{video.snippet.title}</div>
        </div>
      </div>
    </li>
  );
};

export default Result;
