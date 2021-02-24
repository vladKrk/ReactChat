import classes from "./Texting.module.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "../../../components/Message/Message";
import Input from "../../../components/UI/Input/Input";
import { ChatContext } from "../../../context/chat/chatContext";

const Texting = ({ chat, name, history }) => {
  const [message, setMessage] = useState("");

  const dialogRef = useRef(null)
  useEffect(() => {
    if(chat.chatState.selectSuccess) {
      dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    }
  })

  return (
    <div className={classes.Texting}>
      <div className={classes.Texting__DialogBlock} ref = {dialogRef}>
        {chat.chatState.activeRoom && chat.chatState.activeRoom.messages.length > 0 ? (
          chat.chatState.activeRoom.messages.map((message, index) => {
            return (
              <Message
                key={index}
                text={message.text}
                sender={message.sender}
                date={message.date}
              />
            );
          })) : (chat.chatState.activeRoom ? <div className = {classes.Texting__DialogBlock__FirstMessage}>Send first message</div> : null)}
      </div>
      <div className={classes.Texting__InputBlock}>
        <div className={classes.Texting__InputBlock__Broadcast} onClick = {
          () => {
          // if(chat.chatState.selectSuccess) {
            history.push('/broadcast/' + chat.chatState.activeRoom.name)
          // }
          }
        }>
        <i className="fa fa-phone" aria-hidden="true"></i>
        </div>
        <form
          className={classes.Texting__InputBlock__Form}
          onSubmit={(e) => {
            e.preventDefault();
            if (message !== "") {
              chat.sendMessage(message, name, chat.chatState.activeRoom.name);
              setMessage("");
            }
          }}
        >
          <div className={classes.Texting__InputBlock__Input}>
            <Input
              type="text"
              name="inputMessage"
              placeholder="Write a message..."
              value={message}
              onChange={setMessage}
            />
          </div>
          <div
            className={classes.Texting__InputBlock__SendButton}
            onClick={(e) => {
              e.preventDefault();
              if (message !== "") {
                chat.sendMessage(message, name, chat.chatState.activeRoom.name);
                setMessage("");
              }
            }}
          >
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Texting;
