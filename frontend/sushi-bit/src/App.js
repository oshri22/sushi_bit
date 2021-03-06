import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
//import { v4 as uuidv4 } from "uuid";
//import {Provider} from "react-redux"
//import { applyMiddleware, createStore } from 'redux';

import Header from "./component/Header";
import Login from "./component/Login";
import Loginstatus from "./component/Loginstatus";
import Register from "./component/Register";
import BuyMoney from "./component/BuyMoney";
import TrnsferMoney from "./component/TransferMoney";
import Logout from "./component/Logout";
import Comunity from "./component/Comunity";

export default function App() {
  const [userData, setUserdata] = useState({
    username: "",
    password: "",
    money: undefined,
  });
  const [loginStatus, setLoginStatus] = useState("");
  /*
   *check if the user alredy logged in in the past to creat presistence
   */
  useEffect(() => {
    const loggedInUser = localStorage.getItem("sushi-bit-user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      axios.post("/api/login", foundUser).then();
      setUserdata(foundUser);
      setLoginStatus("You are logged in");
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header userData={userData} />
          <Route
            exact
            path="/Login"
            render={(props) => (
              <React.Fragment>
                <Login
                  userData={userData}
                  setUserdata={setUserdata}
                  loginStatus={loginStatus}
                  setLoginStatus={setLoginStatus}
                />
                <Loginstatus status={loginStatus} />
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
                <Loginstatus status={loginStatus} />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/BuyMoney"
            render={(props) => (
              <React.Fragment>
                <BuyMoney userData={userData} setUserdata={setUserdata} />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/TrnsferMoney"
            render={(props) => (
              <React.Fragment>
                <TrnsferMoney userData={userData} setUserdata={setUserdata} />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/Logout"
            render={(props) => (
              <React.Fragment>
                <Logout
                  setUserdata={setUserdata}
                  userData={userData}
                  setLoginStatus={setLoginStatus}
                />
                <Loginstatus status={loginStatus} />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/Form"
            render={(props) => (
              <React.Fragment>
                <Comunity 
                
                />
                {/*<Loginstatus status={loginStatus} />*/}
              </React.Fragment>
            )}
          />
        </div>
      </div>
    </Router>
  );
}
