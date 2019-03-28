import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import './App.css';

const App = () => {
  const [text, setText] = useState('...');

  useEffect(() => {
    get('http://localhost:8080/').then(({ data }) => setText(data));
  }, []);

  return <div className="App">{`show me ${text}`}</div>;
};

export default App;
