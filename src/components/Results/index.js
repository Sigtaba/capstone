import React from 'react';
import Result from '../Result';

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
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
};

export default Results;
