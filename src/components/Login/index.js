import React, { Component } from 'react';
import './styles.css';

const Login = (props) => {

    return (
      <div className="login">
        {props.currentUser ?
          <div className='user-profile'>
            <img src={props.currentUser.photoURL} />
            <h3>Welcome {props.currentUser.displayName}</h3>
            <button onClick={props.userLogout}>Log Out</button>
          </div>
          :
          <button onClick={props.userLogin}>Log In</button>
        }
      </div>
    );
}
export default Login;
