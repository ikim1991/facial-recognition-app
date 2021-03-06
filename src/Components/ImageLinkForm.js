import React from 'react';

const ImageLinkForm = ({ inputChange, buttonSubmit }) => {
  return (
    <div className="image-link-form">
      <p className="f3 center">{`Facial Recongition App`}</p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 form">
          <input className="f4 pa2 w-70 center" type="text" onChange={inputChange}/>
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={buttonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm
