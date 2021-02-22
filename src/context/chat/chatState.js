import { useReducer } from "react";
import api from "../../services/serverApi";
import { ADD_ROOM, CHANGE_ROOMS, ROOM_START, SELECT_ROOM } from "../types";
import { ChatContext } from "./chatContext";
import { chatReducer } from "./chatReducer";

export const ChatState = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, {
    rooms: [],
    activeRoom: "",
  });

  const startChat = async (name, history) => {
    dispatch({
      type: ROOM_START,
    });
    const res = await api.fetchRooms({ name });
    if (res.status === "success") {
      console.log(res.data);
      dispatch({
        type: CHANGE_ROOMS,
        payload: { rooms: res.data },
      });
    }
  };
  const selectRoom = async (name, roomName, history, isNew = false) => {
    console.log('here', name, roomName)
    if (isNew) {
      const res = await api.fetchRoom({ name, roomName });
      if (res.status === "success") {
        dispatch({
          type: ADD_ROOM,
          payload: { room: res.data },
        });
      }
      else { 
          console.log(roomName, res.data)
          return;
      }
    }

    history.push("/chat/" + roomName);
    dispatch({
      type: SELECT_ROOM,
      payload: { name },
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chatState: state,
        startChat,
        selectRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
