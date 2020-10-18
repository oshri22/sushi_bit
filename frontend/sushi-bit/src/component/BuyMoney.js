import React, { useState } from "react";
import axios from "axios";

export default function BuyMoney(props) {
  /**
   * a react function compunent for the transfer money page
   * use get request so the client will be abels to preform xss
   *
   * params -> userTo - a state that contain the user to send the money to
   *           amount - the amount state that contains the amount to transfer
   *           status - the transfer status
   *
   */
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(
    props.userData.username ? "" : "You need to be loggedin"
  );
  //a fuction that will be activated every time the user change the amount filed
  const onChange = (e) => {
    setAmount(e.target.value);
  };
  //a function that will be activated when the user submit the form 
  const onSubmit = async (e) => {
    e.preventDefault();
    //check if the user is logged in yet
    if (props.userData.username) {
      //check if the amount is a positive number
      if (!isNaN(amount) && amount > 0) {
        //the data that will be sent to the server
        const postData = {
          username: props.userData.username,
          amount: amount,
        };
        //the api request
        const res = await axios.post("/api/BuyMoney", postData);
        const data = res.data;
        //check if the money added
        if (data.transferd) {
          const new_amount = props.userData.money + parseInt(amount);
          //change the data
          props.setUserdata({
            ...props.userData,
            money: new_amount,
          });
          setStatus("money added");
        } else {
          setStatus("Somthing went wrong, could not buy money");
        }
      } else {
        setStatus("money cant be string or negative ");
      }
    }
  };

  return (
    <div>
      <h1>Enter amount</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="amount"
          className="input"
          placeholder="Enter Amount ..."
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Buy"
          className="btn"
          style={{ paddingTop: "5px" }}
        />
      </form>
      {status}
    </div>
  );
}
