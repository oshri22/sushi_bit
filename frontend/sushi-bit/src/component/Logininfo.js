import React from "react";

export default function logininfo(props) {
  const style = {
    background: "#fff",
    alignSelf: "flex-start",
    order: 3,
    color: "#000",
    
  };

  const text = () => {
    if (props.userData.username){
        return <>
        <p>User-name :{props.userData.username}</p>
        <p>Password : {props.userData.password}</p>
        <p>Balance : {props.userData.money}</p>
        </>
    }
    else {
        return <>
        <p>Log in to see your profile info</p>
        </>
    }

  }

  return (
    <div style={style}>
      {text()}
    </div>
  );
}
