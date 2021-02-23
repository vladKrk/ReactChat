import { useReducer } from "react";
import api from "../../services/serverApi";
import {
  ADD_MESSAGE,
  ADD_ROOM,
  ADD_USER,
  CHANGE_ROOMS,
  ROOM_ERROR,
  ROOM_START,
  ROOM_SUCCESS,
  SELECT_ROOM,
  SELECT_SUCCESS,
} from "../types";
import { ChatContext } from "./chatContext";
import { chatReducer } from "./chatReducer";

export const ChatState = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, {
    rooms: [],
    activeRoom: null,

    roomError: null,
    roomSuccess: false,

    selectSuccess: false,

  });

  const startChat = async (name, history) => {
    dispatch({
      type: ROOM_START,
    });
    const res = await api.fetchRooms({ name });
    if (res.status === "success") {
      dispatch({
        type: CHANGE_ROOMS,
        payload: { rooms: res.data },
      });
      dispatch({
          type: ROOM_SUCCESS
      })
    } else {
      dispatch({
        type: ROOM_ERROR,
        payload: { error: res.data },
      });
    }
  };

  const selectRoom = async (name, roomName, history) => {
    const res = await api.fetchRoom({ name, roomName });

    //Подписки на сообщения и пользователей
    api.socket.removeAllListeners("message");
    api.socket.on("message", (mes) => {
      dispatch({
        type: ADD_MESSAGE,
        payload: {text: mes.text, sender: mes.sender, date: mes.date, roomName: roomName},
      });
    })
    api.socket.removeAllListeners("membersSubscribe");
    api.socket.on("membersSubscribe", (member) => {
      dispatch({
        type: ADD_USER,
        payload: {name: member.name, roomName: member.roomName},
      });
    })
    //-----------------------------------------

    if (res.status === "success") {
      dispatch({
        type: ADD_ROOM,
        payload: { room: res.data },
      });
      history.push("/chat/" + roomName);
      dispatch({
        type: SELECT_ROOM,
        payload: { roomName },
      });
    } else {
      if (res.data === "This user has such room") {
        history.push("/chat/" + roomName);
        dispatch({
          type: SELECT_ROOM,
          payload: { roomName },
        });
      } else {
        history.push("/chat/" + name);
        dispatch({
          type: SELECT_ROOM,
          payload: { roomName: name },
        });
      }
    }
    dispatch({
        type: SELECT_SUCCESS
    })
  };

  const sendMessage = async (text, sender, roomName) => {
    const res = await api.sendMessage({ text, sender, roomName});
    if (res.status === "success") {
      dispatch({
        type: ADD_MESSAGE,
        payload: {text, sender, date: new Date(Date.now()).toTimeString().slice(0, 5), roomName: roomName},
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chatState: state,
        startChat,
        selectRoom,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
