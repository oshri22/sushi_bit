import React from "react";
import axios from "axios";

export default function Logout(props) {
  const handleLogout = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("sushi-bit-user")) {
      const res = await axios.get("/api/Logout");
      console.log(res.data);

      if (res.data.status) {
        console.log("1");
        props.setUserdata({
          username: "",
          password: "",
          money: undefined,
        });
        props.setLoginStatus("");
        localStorage.removeItem("sushi-bit-user");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogout}>
        <input
          type="submit"
          value="Log Out"
          className="btn"
          style={{ paddingTop: "5px" }}
        />
      </form>
    </div>
  );
}
