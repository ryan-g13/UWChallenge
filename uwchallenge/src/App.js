import React, { Component } from 'react';
import { GHFetch } from './ghFetch.js';
import './App.css';

class App extends Component {

  // componentDidMount() {
  //   // TODO: create a method to wait to render until you hit localhost:4000
  //   // Router.get('/');
  //   fetch('http://localhost:4000/').then(response => {
  //     console.log(response);
  //   })
  // }

  render() {
    return (
      <div className="App">
          <h1>Avatar Display</h1>
          <GHFetch/>
      </div>
    );
  }
}

export default App;
