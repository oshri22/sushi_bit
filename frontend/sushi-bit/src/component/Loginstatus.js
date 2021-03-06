import React from "react";

export default function Loginstatus(props) {
  //function to display 

  const statusStyle = () => {
    return { color: props.status.includes("logged in")  ? "#008" : "#ff0000" };
  };

  return (
    <div
      className="status"
    >
      <p style={statusStyle()}>{props.status}</p>
    </div>
  );
}
