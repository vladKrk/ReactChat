import classes from "./ActiveUsers.module.scss";
import React from "react";

const ActiveUsers = ({users, name, activeUsers}) => {
  return (
    <div className={classes.ActiveUsers}>
      <div className={classes.ActiveUsers__Title}>Members</div>
      <div className = {classes.ActiveUsers__UsersList}>
          <ul>
            {users.map((user, index) => {
                return <li key = {index}>
                  {user === name ? user + ' ( You )' : (activeUsers.includes(user) ? user + ' [ONLINE]' : user)}
                </li>
            })}
          </ul>
      </div>
    </div>
  );
};

export default ActiveUsers;
