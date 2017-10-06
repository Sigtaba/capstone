import React from 'react';
import UserResult from '../UserResult';

const UserResults = (props) => {

  const userResultItems = props.userVideos.map((userVideo) => {
    return (
      <UserResult
        onUserVideoSelect={props.onUserVideoSelect}
        key={userVideo.etag}
        video={userVideo} />
    )
  });

  return (
    <ul className="grid-container">
      {userResultItems}
    </ul>
  );
};

export default UserResults;
