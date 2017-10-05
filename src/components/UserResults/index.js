// import React, { Component } from 'react';
// import firebase, { auth, provider } from '../Firebase';
//
//
// class UserVideos extends Component {
//   constructor(props) {
//     super(props)
//   };
//
//   render() {
//     return (
//       <section className='display-item'>
//         <div className="wrapper">
//           <ul>
//             {this.props.selectedItems.map((item) => {
//               return (
//
//                 <li key={item.key}>
//                   <h3>{item.title}</h3>
//                   <p>{item.channel}</p>
//                   <button></button>
//                 </li>
//
//               )
//             })}
//           </ul>
//         </div>
//       </section>
//     )
//   }
//
//
// }
//
// export default UserVideos;
//





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
    <ul className="col-md-4 list-group">
      {userResultItems}
    </ul>
  );
};

export default UserResults;
