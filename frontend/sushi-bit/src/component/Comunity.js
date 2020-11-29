import React, { useState, useEffect } from "react";
import Axios from "axios";
import Messeges from "./Messeges";

export default function Comunity(props) {
  const [newMessege, setMessege] = useState("");
  const [error, seterror] = useState("");
  const [pastMesseges, setPastMesseges] = useState([
    {
      user: "",
      text: "",
      id: "",
    },
  ]);

  const getData = async () => {
    if (localStorage.getItem("sushi-bit-user")) {
      if (!pastMesseges[0].user) {
        const res = await Axios.get("/api/GetForm");
        setPastMesseges(res.data.data.reverse());
        seterror("");
      } else {
        setPastMesseges(pastMesseges);
      }
    } else {
      setPastMesseges(pastMesseges);
      seterror("you need to login");
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const onChange = (e) => {
    setMessege(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newMessege) {
      seterror("");
      const res = await Axios.get(`/api/addForm/${newMessege}`);
      const data = res.data;
      if (data.saved) {
        const res = await Axios.get(`/api/GetForm`);
        setPastMesseges(res.data.data.reverse());
        seterror(data.type);
        setMessege("");
      } else {
        seterror("somthing went wrong please try again");
      }
    } else {
      seterror("Cant be empty ");
    }
  };

  return (
    <div>
      <h1>Comunity </h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="messege"
          className="input"
          placeholder="Enter messege ..."
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ paddingTop: "5px" }}
        />
      </form>
      {error}
      <br />
      <div style={{ overflowY: "scroll",overflowX:"hidden",width:"500px",height:"300px"}}>
        <Messeges Messeges={pastMesseges} />
      </div>
    </div>
  );
}
