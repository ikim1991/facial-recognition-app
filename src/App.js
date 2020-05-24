import React from 'react';
import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import 'tachyons'
import Navigation from './Components/Navigation';
import Logo from './Components/Logo';
import ImageCounter from './Components/ImageCounter';
import ImageLinkForm from './Components/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition';
import SignIn from './Components/SignIn'
import Register from './Components/Register'
import { Switch } from 'react-router-dom'
const Clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      loggedIn: window.localStorage.getItem("token-persists"),
      input: '',
      imageURL: "",
      box: [],
      user: {}
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
    .then(response => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/image`, {
        method: 'put',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.token}
      })
        .then(res => res.json())
        .then(data => {
          this.setState({user: data})
        })
      return this.calculateFaceLocation(response)
    })
    .then(box => this.displayFaceBox(box))
    .catch(err => console.log(err))
  }

  loadUser = (user) => {
    if(user){
      this.setState({ user })
    }
  }

  login = (error, token) => {
    if(token){
      window.localStorage.setItem("token", token)
      window.localStorage.setItem("token-persists", true)
    }

    if(!error){
      this.setState({loggedIn: true})
    }
  }

  logout = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        user: data,
        box: [],
        imageURL: "",
        loggedIn: false
      }, () => {
        window.localStorage.clear()
      })
    })
    // this.setState({
    //   loggedIn: false,
    //   user: {},
    //   box: [],
    //   imageURL: "",
    // }, () => {
    //   window.localStorage.clear()
    // })
  }

  componentDidMount(){
    if(this.state.loggedIn && window.location.href.includes("/app")){
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        method: 'get',
        headers:{
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(res => res.json())
      .then(data => {
        if(!data.error){
          this.loadUser(data)
        }
      })
    }
  }

  render(){
    return(
      <div className="App">
        <Navigation logout={this.logout}/>
        <Logo />
        <Switch>
          <Route exact path="/" render={(props) => {
            return(
              <SignIn {...props} loggedIn={this.state.loggedIn} loadUser={this.loadUser} login={this.login}/>
            )
          }}/>
          {
            (this.state.loggedIn) ? (
              <Route exact path="/app" render={() => {
                return (
                    <Fragment>
                      <ImageCounter user={this.state.user} loadUser={this.loadUser}/>
                      <ImageLinkForm inputChange={this.onInputChange} buttonSubmit={this.onButtonSubmit}/>
                      <FaceRecognition url={this.state.imageURL} box={this.state.box}/>
                    </Fragment>
                  )
              }}/>
            ) : (
              <Redirect to="/"/>
            )
          }
          <Route exact path="/register" render={(props) => {
            return(
              <Register {...props} loggedIn={this.state.loggedIn} loadUser={this.loadUser} login={this.login}/>
            )
          }}/>
        </Switch>
      </div>
    )
  }
}

export default App;
