import React from 'react';

class ImageCounter extends React.Component {

  render(){
    return (
      <div className="image-counter">
        <div className="white f3 center">
          {`Welcome ${this.props.user.name}! Your Current Number of Images Detected: ${this.props.user.entries}`}
        </div>
      </div>
    )
  }
}


export default ImageCounter
