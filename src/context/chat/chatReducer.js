import {
  ROOM_START,
  ROOM_SUCCESS,
  ROOM_ERROR,
  CHANGE_ROOMS,
  SELECT_ROOM,
  ADD_ROOM,
  ADD_MESSAGE,
  SELECT_SUCCESS,
  ADD_USER,
  CHANGE_ACTIVE_USERS,
} from "../types";

const handlers = {
  [ROOM_START]: (state) => ({ ...state }),
  [ROOM_SUCCESS]: (state) => ({ ...state, roomSuccess: true }),
  [ROOM_ERROR]: (state, { payload }) => ({
    ...state,
    roomError: payload.error,
  }),
  [CHANGE_ROOMS]: (state, { payload }) => ({
    ...state,
    rooms: [...payload.rooms],
  }),
  [SELECT_SUCCESS]: (state) => ({ ...state, selectSuccess: true }),
  [SELECT_ROOM]: (state, { payload }) => {
    let activeRoom;
    for (let room of state.rooms) {
      if (room.name === payload.roomName) {
        activeRoom = room;
        break;
      }
    }
    return {
      ...state,
      activeRoom: activeRoom,
    };
  },
  [ADD_ROOM]: (state, { payload }) => ({
    ...state,
    rooms: [...state.rooms, payload.room],
  }),

  [ADD_MESSAGE]: (state, { payload }) => {
    let ind;
    let newRooms = state.rooms.map((room, index) => {
      if (room.name === payload.roomName) {
        ind = index;
        return {
          name: room.name,
          messages: [
            ...room.messages,
            {
              text: payload.text,
              sender: payload.sender,
              date: payload.date,
            },
          ],
          users: [...room.users],
        };
      } else {
        return {
          name: room.name,
          messages: [...room.messages],
          users: [...room.users],
        };
      }
    });

    return {
      ...state,
      rooms: newRooms,
      activeRoom: newRooms[ind]
    };
  },
  [ADD_USER]: (state, {payload}) => {
    let newRooms = JSON.parse(JSON.stringify(state.rooms));
    let ind = 0;
    for(let room of newRooms) {
      if(room.name === payload.roomName) {
        room.users.push(payload.name)
        break;
      }
      ind++;
    }
    return {
      ...state,
      rooms: newRooms,
      activeRoom: newRooms[ind]
    }
  },
  [CHANGE_ACTIVE_USERS]: (state, {payload}) => ({...state, activeUsers: [...payload.activeUsers]}),
  DEFAULT: (state) => state,
};

export const chatReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
