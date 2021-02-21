import { AUTH_ERROR, AUTH_START, AUTH_SUCCESS } from "../types";

const handlers = {
    [AUTH_START]: (state) => ({...state, loading: true}),
    [AUTH_SUCCESS]: (state, {payload}) => ({...state, loading: false, name: payload.name}),
    [AUTH_ERROR]: (state, {payload}) => ({...state, loading: false, error: payload.error}),
    DEFAULT: state => state
}

export const authReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
}