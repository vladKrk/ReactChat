import classes from "./RoomsList.module.scss";
import React from "react";
import Room from "../../../components/Room/Room";

const RoomsList = ({ rooms, activeRoom, name, history, selectRoom }) => {
  return (
    <div className={classes.RoomsList}>
      {rooms.map((room, index) => {
        return (
          <Room
            key={index}
            roomName={room.name}
            isActive={room.name === activeRoom}
            name={name}
            history={history}
            selectRoom={selectRoom}
          />
        );
      })}
    </div>
  );
};

export default RoomsList;
