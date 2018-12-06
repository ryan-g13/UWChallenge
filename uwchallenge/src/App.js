import React, { Component } from 'react';
import { GHFetch } from './ghFetch.js';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <h1>Avatar Display</h1>
          <div className="images">
            <GHFetch/>
          </div>
      </div>
    );
  }
}

export default App;
