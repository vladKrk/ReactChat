import classes from "./Chat.module.scss";
import React, { useContext, useEffect } from "react";
import RoomsList from "./RoomsList/RoomsList";
import Header from "../../components/Header/Header";
import Texting from "./Texting/Texting";
import { AuthContext } from "../../context/auth/authContext";
import ActiveUsers from "./ActiveUsers/ActiveUsers";
import { ChatContext } from "../../context/chat/chatContext";
import api from "../../services/serverApi";
import { useHistory } from "react-router-dom";

const Chat = () => {
  const auth = useContext(AuthContext);
  const chat = useContext(ChatContext);

  let history = useHistory();
  const idFromPath = document.location.pathname.slice(6);

  useEffect(() => {
    api.connect("ws://localhost:3001");
    (async () => {
      await chat.startChat(auth.authState.name, history);
      if (idFromPath === "") {
        await chat.selectRoom(auth.authState.name, auth.authState.name, history);
      } else {
        let isNew = true;
        for (let room of chat.chatState.rooms) {
          if (room.name === idFromPath) {
            isNew = false;
            break;//
          }
        }
        console.log("2", isNew);
        await chat.selectRoom(auth.authState.name, idFromPath, history, isNew);
      }
    })();
  }, []);

  return (
    <div className={classes.Chat}>
      <div className={classes.Chat__Left}>
        <div className={classes.Chat__Left__Head}>
          <button className={classes.Chat__Left__Head__AddRoom}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          <p>{auth.authState.name}</p>
          <button
            className={classes.Chat__Left__Head__Exit}
            onClick={auth.logout}
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
        <div className={classes.Chat__Left__Content}>
          <RoomsList
            rooms={chat.chatState.rooms}
            activeRoom={chat.chatState.activeRoom}
          />
        </div>
      </div>
      <div className={classes.Chat__Right}>
        <Header title="Chat" />
        <div className={classes.Chat__Right__TextingAndOnline}>
          <div className={classes.Chat__Right__TextingAndOnline__MiddlePanel}>
            <Texting />
          </div>
          <div className={classes.Chat__Right__TextingAndOnline__RightPanel}>
            <ActiveUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
