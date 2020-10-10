import React, { useState, Component } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import {Provider} from "react-redux"
//import { applyMiddleware, createStore } from 'redux';

import Header from "./component/Header";
import Login from "./component/Login";
import Loginstatus from "./component/Loginstatus";

export default function App() {
  const [username, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route
            exact
            path="/login"
            render={(props) => (
              <React.Fragment>
                <Login
                  username={username}
                  setUsername={setUsername}
                  loginStatus={loginStatus}
                  setLoginStatus={setLoginStatus}
                />
                <Loginstatus status = {loginStatus}/>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    </Router>
  );
}
