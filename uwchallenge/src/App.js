import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import ghResponse from '../server.js'; having issues importing here

class App extends Component {

  componentDidMount() {
    // TODO: create a method to wait to render until you hit localhost:4000
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Avatar Display</h1>
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
