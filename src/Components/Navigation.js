import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <nav className="navigation">
      <Link to="/">
        <p className="f3 link dim black underline pa3 pointer" onClick={props.logout}>Sign Out</p>
      </Link>
    </nav>
  )
}

export default Navigation
