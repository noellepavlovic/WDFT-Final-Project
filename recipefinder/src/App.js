import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  
  login = () => {
    axios.get('http://localhost:8080/auth/google', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }})
    .then((res) => {
      // res.setHeader("Access-Control-Allow-Origin", "*")
      console.log(res)
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <p className="App-intro">
        <button onClick={this.login}>Login</button>

          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
