// require("dotenv").config();
import  Router  from "./navigation/Router";
import React from 'react';
import "./App.css";
import "./assets/normalize.css";
import 'font-awesome/css/font-awesome.css';

import Test from "./navigation/Test";

function App() {
  // return <Router />;
  return (
    <div className="App">
  {/* <Test /> */}
  <Router/>
    </div>
  );
}

export default App;
