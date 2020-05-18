import React from 'react';

const FaceRecognition = (props) => {
  return (
    <div className="face-recongition center ma">
      {
        props.url === "" ? (
          <div></div>
        ) : (
          <div className="center absolute mt4 mb4">
            <img className="input-image" src={props.url} alt="Detection" width='800px' height='auto'/>
            {props.box.map((b, i) => {
              return (
                <div className="bounding-box" style={{top: b.topRow, right: b.rightCol, bottom: b.bottomRow, left: b.leftCol}} key={i}></div>
              )
            })}
          </div>
        )
      }

    </div>
  )
}

export default FaceRecognition
