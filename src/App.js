import React from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'tachyons'
import Navigation from './Components/Navigation';
import Logo from './Components/Logo';
import ImageCounter from './Components/ImageCounter';
import ImageLinkForm from './Components/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition';
import SignIn from './Components/SignIn'
import Register from './Components/Register'
const Clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      input: '',
      imageURL: "",
      box: []
    }
  }

  // https://image-cdn.essentiallysports.com/wp-content/uploads/20200507141928/Rafael-Nadal-looking-up-from-PA-752x428-2.jpg

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions
      const image = document.querySelector('.input-image')
      const width = Number(image.width)
      const height = Number(image.height)

      const bounding_boxes = clarifaiFace.map((box) => {
        return {
          leftCol: box.region_info.bounding_box.left_col * width,
          topRow: box.region_info.bounding_box.top_row * height,
          rightCol: width - (box.region_info.bounding_box.right_col * width),
          bottomRow: height - (box.region_info.bounding_box.bottom_row * height)
        }
      })

      return bounding_boxes
  }

  displayFaceBox = (box) => {
    this.setState({ box })
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value})
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .then(box => this.displayFaceBox(box))
    .catch(err => console.log(err))
  }

  render(){
    return(
      <div className="App">
        <Navigation />
        <Logo />
        <Route exact path="/" component={SignIn}/>
        <Route path ="/register" component={Register}/>
        <Route path="/app" render={() => {
          return (
            <Fragment>
              <ImageCounter />
              <ImageLinkForm inputChange={this.onInputChange} buttonSubmit={this.onButtonSubmit}/>
              <FaceRecognition url={this.state.imageURL} box={this.state.box}/>
            </Fragment>
          )
        }}/>
      </div>
    )
  }
}

export default App;
