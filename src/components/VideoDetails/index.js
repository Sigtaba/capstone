import React from 'react';
import './styles.css';


const VideoDetails = ({video}) => {

  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;
  console.log(video);

  return (
    <div className="video-details">
      <div className="videoWrapper">
        <iframe src={url}></iframe>
      </div>
      <div className="details">
        <h3 className="video-title">{video.snippet.title}</h3>
        <p className="video-channel">Uploaded by: {video.snippet.channelTitle}</p>
        {/* <p className="video-channel">Published on: {video.snippet.publishedAt}</p> */}
        <p className="video-description">{video.snippet.description}</p>
      </div>
    </div>

  );
};

export default VideoDetails;
