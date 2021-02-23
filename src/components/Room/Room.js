import classes from "./Room.module.scss";
import React from "react";


const Room = ({ roomName, isActive, name, history, selectRoom}) => {
  const cls = [classes.Room]
  if(isActive) cls.push(classes.active)
  return (
    <div className={cls.join(" ")} onClick = {() => {
      selectRoom(name, roomName, history)
    }}>
      <div className={classes.Room__Photo}></div>
      <div className={classes.Room__Info}>
          <div className={classes.Room__Info__Name}>{roomName}</div>
      </div>
    </div>
  );
};

export default Room;
