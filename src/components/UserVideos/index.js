import React from 'react';


const UserVideos = (props) => {

  return (
    <section className='display-item'>
      <div className="wrapper">
        <ul>
          {props.items.map((item) => {
            return (

              <li key={props.items.key}>
                <h3>{props.items.title}</h3>
                <p>{props.items.channel}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default UserVideos;
