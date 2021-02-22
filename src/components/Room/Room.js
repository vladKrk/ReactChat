import classes from "./Room.module.scss";
import React from "react";


const Room = ({ name, isActive}) => {
  const cls = [classes.Room]
  if(isActive) cls.push(classes.active)
  return (
    <div className={cls.join(" ")}>
      <div className={classes.Room__Photo}></div>
      <div className={classes.Room__Info}>
          <div className={classes.Room__Info__Name}>{name}</div>
      </div>
    </div>
  );
};

export default Room;
