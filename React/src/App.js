import React from "react";
import logo from "./logo.svg";
import Test from "./pages/test";
import "./App.css";

function App() {
  if (false) {
    return (
      <div>
        <Test/>
        <h1>BAD JEEVES!</h1>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <Test jeeves1={'Jeeves1'}  jeeves2={'Jeeves2'} />
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

export default App;
