import { ROOM_START, ROOM_SUCCESS, ROOM_ERROR, CHANGE_ROOMS, SELECT_ROOM, ADD_ROOM } from "../types";

const handlers = {
    [ROOM_START]: (state) => ({...state}),
    [ROOM_SUCCESS]: (state, {payload}) => ({...state}),
    [ROOM_ERROR]: (state, {payload}) => ({...state, error: payload.error}),
    [CHANGE_ROOMS]: (state, {payload}) => ({...state, rooms: [...payload.rooms]}),
    [SELECT_ROOM]: (state, {payload}) => ({...state, activeRoom: payload.name}),
    [ADD_ROOM] : (state, {payload}) => ({...state, rooms: [...state.rooms, payload.room]}),
    DEFAULT: state => state
}

export const chatReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
}