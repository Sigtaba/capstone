import React from 'react';
import Result from '../Result';
import './styles.css';

const Results = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <Result
        onVideoSelect={props.onVideoSelect}
        key={video.etag}
        video={video} />
    )
  });

  return (
    <ul className="grid-container">
      {videoItems}
    </ul>
  );
};

export default Results;
