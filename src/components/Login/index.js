import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Login = (props) => {

    return (
      <div className="login">
        <h1 className="title"><span id="title-span">TUBE</span>TUBE</h1>
        {props.currentUser ?
          <div className='user-profile'>
            <img src={props.currentUser.photoURL} />
            <h3>Welcome {props.currentUser.displayName}</h3>
            <button className="auth" onClick={props.userLogout}>SIGN O
            UT</button>
            <Link to={`/search`}>
              <button onClick={props.userLogout}>Search TubeTube</button>
            </Link>
          </div>
          :
          <Link to={`/search`}>
            <button className="auth" onClick={props.userLogin}>SIGN IN</button>
          </Link>
        }
      </div>
    );
}
export default Login;
