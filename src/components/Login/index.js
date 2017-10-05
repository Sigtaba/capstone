import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Login = (props) => {

    return (
      <div className="login">
        {props.currentUser ?
          <div className='user-profile'>
            <img src={props.currentUser.photoURL} />
            <h3>Welcome {props.currentUser.displayName}</h3>
            <button onClick={props.userLogout}>Log Out</button>
            <Link to={`/search`}>
              <button onClick={props.userLogout}>Search TubeTube</button>
            </Link>
          </div>
          :
          <Link to={`/search`}>
            <button onClick={props.userLogin}>Log In</button>
          </Link>
        }
      </div>
    );
}
export default Login;
