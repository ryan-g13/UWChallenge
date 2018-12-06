import React, { Component } from 'react';
import { GHFetch } from './ghFetch.js';
import logo from './logo.svg';
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
        <header className="App-header">
          <h1>Avatar Display</h1>
          <GHFetch/>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
