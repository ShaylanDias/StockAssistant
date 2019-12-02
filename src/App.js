import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main.js';
import Navigation from './Navigation.js';
import Game from './Game';

function App() {
  return (
    <div>
    	<Navigation/>
    	<Main/>
      <Game/>
    </div>
  );
}

export default App;
