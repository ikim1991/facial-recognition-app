import React from 'react';

const ImageCounter = (props) => {
  return (
    <div className="image-counter">
      <div className="white f3 center">
        {`Welcome ${props.user.name}! Your Current Number of Images Detected: ${props.user.entries}`}
      </div>
    </div>
  )
}

export default ImageCounter
