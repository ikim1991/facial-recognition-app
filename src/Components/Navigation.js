import React from 'react';

const Navigation = (props) => {
  return (
    <nav className="navigation">
      <p className="f3 link dim black underline pa3 pointer" onClick={props.logout}>Sign Out</p>
    </nav>
  )
}

export default Navigation
