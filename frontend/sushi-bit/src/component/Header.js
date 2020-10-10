import React from 'react'
import {Link} from 'react-router-dom'

export default function header() {
    return (
        <header style = {headerStyle}>
            <h1>Sushi-Bit</h1>
            <Link style = {{color:"#fff"}} to = "/" id = "Home">
                Home
            </Link>
            {" | "}
            <Link style = {{color: "#fff"}} to = "/login">
                Login
            </Link>


        </header>
    )

}

const headerStyle = {
    background: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
  };