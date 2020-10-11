import React from 'react'
import {Link} from 'react-router-dom'

import Logininfo from "./Logininfo"

export default function header(props) {
    return (
        <header style = {headerStyle}>
            <Logininfo userData = {props.userData}/>
            <h1>Sushi-Bit</h1>
            <div>
                <Link style = {{color:"#fff"}} to = "/" id = "Home">
                    Home
                </Link>
                {" | "}
                <Link style = {{color: "#fff"}} to = "/login">
                    Login
                </Link>
                {" | "}
                <Link style = {{color: "#fff"}} to = "/Register">
                    Register
                </Link>
            </div>


        </header>
    )

}

const headerStyle = {
    background: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    display: "flex",
    flexDirection: "column"
  };