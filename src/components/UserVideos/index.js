import React, { Component } from 'react';
import firebase, { auth, provider } from '../Firebase';


class UserVideos extends Component {
  constructor(props) {
    super(props)
  };

  render() {
    return (
      <section className='display-item'>
        <div className="wrapper">
          <ul>
            {this.props.selectedItems.map((item) => {
              return (

                <li key={item.key}>
                  <h3>{item.title}</h3>
                  <p>{item.channel}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }


}

export default UserVideos;
