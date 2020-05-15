import React from 'react';
import './App.css';
import 'tachyons'
import Navigation from './Components/Navigation';
import Logo from './Components/Logo';
import ImageCounter from './Components/ImageCounter';
import ImageLinkForm from './Components/ImageLinkForm';

class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Navigation />
        <Logo />
        <ImageCounter />
        <ImageLinkForm />
      </div>
    )
  }
}

export default App;
