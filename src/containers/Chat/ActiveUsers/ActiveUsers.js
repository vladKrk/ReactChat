import classes from "./ActiveUsers.module.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth/authContext";

const ActiveUsers = () => {
  return (
    <div className={classes.ActiveUsers}>
      <div className={classes.ActiveUsers__Title}>Members</div>
    </div>
  );
};

export default ActiveUsers;
