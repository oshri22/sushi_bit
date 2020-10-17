import React, { useState } from "react";
import Axios from "axios";

//a react function component used for the login page

export default function Register(props) {
  /*
   *usernamesate contain the current value that the user entered to the filed
   *passwordstate is the same as the usernamestate but for the password
   *setUsername is the hook to change the username
   *setUsername is the hook to change the password
   */
  const [usernameState, setUsername] = useState("");
  const [passwordState, setPassword] = useState("");

  //updating the usernameState every time the user enter somthing to the username filed
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  //updating the usernameState every time the user enter somthing to the username filed
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  //an event to be triggered every time the user submit the form
  const formSubmit = async (e) => {
    //prevent the auto send
    e.preventDefault();

    //check if the user is already logged in
    //console.log(props.Loginstatus);
    if (
      props.loginStatus === "You are logged in" ||
      props.loginStatus === "You already logged in"
    ) {
      props.setLoginStatus("You already logged in");
    } else if (!usernameState) {
      props.setLoginStatus("Username is empty");
    } else if (!passwordState) {
      props.setLoginStatus("password is empty");
    } else {
      //the data that will be send for the backends w
      const postData = {
        username: usernameState,
        password: passwordState,
        money: 0,
      };
      //making the request using axios
      const res = await Axios.post("/api/register", postData);
      const data = res.data;

      //check the status of the response and later to choose the login ststus
      if (res.status === 200) {
        if (data.name === "error") {
          props.setLoginStatus(
            "there is already a user with the given username"
          );
        } else {
          props.setUsername(usernameState);
          props.setLoginStatus(
            "You have registered sucssesfully You are logged in"
          );
        }
      } else {
        props.setLoginStatus(
          "An internal server error has been occur please try again"
        );
      }
    }
  };

  //the jsx to be presented on the screen later
  return (
    <div
      // @ts-ignore
      className="formdiv"
    >
      <h1 style={{ alignSelf: "center", order: 1 }}>Register</h1>
      <form
        onSubmit={formSubmit}
        // @ts-ignore
        className="form"
      >
        <input
          type="text"
          name="username"
          className="input"
          placeholder="Enter Username ..."
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
          onChange={onChangeUsername}
        />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Enter Password ..."
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
          onChange={onChangePassword}
        />
        <input
          type="submit"
          value="Register"
          className="btn"
          style={{ paddingTop: "5px" }}
        />
      </form>
    </div>
  );
}
