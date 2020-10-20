// @ts-ignore
import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function TransferMoney(props) {
  /**
   * a react function compunent for the transfer money page
   * use get request so the client will be abels to preform xss
   *
   * params -> userTo - a state that contain the user to send the money to
   *           amount - the amount state that contains the amount to transfer
   *           status - the transfer status
   *           toSave - if useEfect hook need to change the user data in the local storage
   *
   */
  const [userTo, setUserto] = useState("");
  const [amount, setamount] = useState(0);
  const [status, setStatus] = useState(
    localStorage.getItem("sushi-bit-user") ? "" : "You need to be loggedin"
  );
  const [toSave, setTosave] = useState(false);

  useEffect(() => {
    if (toSave) {
      localStorage.setItem("sushi-bit-user", JSON.stringify(props.userData));
      props.setUserdata({
        ...props.userData,
      });
      setTosave(false);
    }
  }, [toSave, props]);

  //a function that will change the status every time the user type somthing to the user filed
  const onChangeUser = (e) => {
    setUserto(e.target.value);
  };

  //a function that will change the status every time the user type somthing to the amount filed
  const onChangeAmount = (e) => {
    setamount(e.target.value);
  };

  //a function to prosses when the user dubmit the form
  const onSubmit = async (e) => {
    e.preventDefault();
    //check if the user is connected
    if (props.userData.username) {
      //check if the amount is a positive number
      if (!isNaN(amount) && amount > 0) {
        //the api request that is vonerbole to xss
        const res = await Axios.get(`/api/TransferMoney/${userTo}/${amount}`);
        const data = res.data;
        //check if the money is transfered
        if (data.transferd) {
          const new_amount = props.userData.money - parseInt(amount);
          //change the status
          props.setUserdata({
            ...props.userData,
            money: new_amount,
          });
          setTosave(true);
          setStatus("Money Transfered sucssesfoly");
        } else {
          setStatus("Cant trnsfer money");
        }
      }
    } else {
      setStatus("money cant be string or negative ");
    }
  };

  return (
    <div>
      <h1>Enter amount</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="UserTo"
          className="input"
          placeholder="Enter usrer to send money to ..."
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
          onChange={onChangeUser}
        />
        <br />
        <input
          type="text"
          name="amount"
          className="input"
          placeholder="Enter Amount ..."
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
          onChange={onChangeAmount}
        />
        <input
          type="submit"
          value="Transfer"
          className="btn"
          style={{ paddingTop: "5px" }}
        />
      </form>
      {status}
    </div>
  );
}
