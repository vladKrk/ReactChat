import classes from "./Chat.module.scss";
import React, { useContext, useEffect } from "react";
import RoomsList from "./RoomsList/RoomsList";
import Header from "../../components/Header/Header";
import Texting from "./Texting/Texting";
import { AuthContext } from "../../context/auth/authContext";
import ActiveUsers from "./ActiveUsers/ActiveUsers";
import { ChatContext } from "../../context/chat/chatContext";
import { useHistory } from "react-router-dom";
import api from "../../services/serverApi";

const Chat = () => {
  const auth = useContext(AuthContext);
  const chat = useContext(ChatContext);

  let history = useHistory();
  const idFromPath = document.location.pathname.slice(6);

  useEffect(() => {
    chat.startChat(auth.authState.name, history);
    api.checkingUser({name: auth.authState.name});
  }, []);

  useEffect(() => {
    if (idFromPath === "") {
      chat.selectRoom(auth.authState.name, auth.authState.name, history);
    } else {
      chat.selectRoom(auth.authState.name, idFromPath, history);
    }
  }, []);

  return (
    <div className={classes.Chat}>
      <div className={classes.Chat__Left}>
        <div className={classes.Chat__Left__Head}>
          <p>Rooms</p>
          <div className={classes.Chat__Left__Head__ExitBlock}>
            <p>{auth.authState.name}</p>
            <button
              className={classes.Chat__Left__Head__ExitBlock__Exit}
              onClick={() => {auth.logout(auth.authState.name)}}
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className={classes.Chat__Left__Content}>
          {chat.chatState.selectSuccess && (
            <RoomsList
              rooms={chat.chatState.rooms}
              activeRoom={chat.chatState.activeRoom.name}
              selectRoom={chat.selectRoom}
              name={auth.authState.name}
              history={history}
            />
          )}
        </div>
      </div>
      <div className={classes.Chat__Right}>
        <Header title="Chat" />
        <div className={classes.Chat__Right__TextingAndOnline}>
          <div className={classes.Chat__Right__TextingAndOnline__MiddlePanel}>
            <Texting chat={chat} name={auth.authState.name} history = {history}/>
          </div>
          <div className={classes.Chat__Right__TextingAndOnline__RightPanel}>
            {chat.chatState.selectSuccess && (
            <ActiveUsers users = {chat.chatState.activeRoom.users} name = {auth.authState.name} activeUsers = {chat.chatState.activeUsers}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
