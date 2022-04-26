// require("dotenv").config();
import  Router  from "./navigation/Router";
import React from 'react';
import "./App.css";
import "./assets/normalize.css";
import 'font-awesome/css/font-awesome.css';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // return <Router />;
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router/>
    </div>
  );
}

export default App;
