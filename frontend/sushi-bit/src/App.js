import React, { useState} from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import {Provider} from "react-redux"
//import { applyMiddleware, createStore } from 'redux';

import Header from "./component/Header";
import Login from "./component/Login";
import Loginstatus from "./component/Loginstatus";
import Register from "./component/Register";

export default function App() {
  const [userData, setUserdata] = useState({
    username:"",
    password:"",
    money:undefined
  });
  const [loginStatus, setLoginStatus] = useState("");

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header userData = {userData}/>
          <Route
            exact
            path="/login"
            render={(props) => (
              <React.Fragment>
                <Login
                  userData={userData}
                  setUserdata={setUserdata}
                  loginStatus={loginStatus}
                  setLoginStatus={setLoginStatus}
                />
                <Loginstatus status = {loginStatus}/>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/Register"
            render={(props) => (
              <React.Fragment>
                <Register
                  userData={userData}
                  setUserdata={setUserdata}
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
