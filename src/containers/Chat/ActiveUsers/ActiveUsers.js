import classes from "./ActiveUsers.module.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth/authContext";

const ActiveUsers = ({users, name}) => {
  return (
    <div className={classes.ActiveUsers}>
      <div className={classes.ActiveUsers__Title}>Members</div>
      <div className = {classes.ActiveUsers__UsersList}>
          <ul>
            {users.map((user, index) => {
                return <li key = {index}>
                  {user === name ? user + ' ( You )' : user}
                </li>
            })}
          </ul>
      </div>
    </div>
  );
};

export default ActiveUsers;
