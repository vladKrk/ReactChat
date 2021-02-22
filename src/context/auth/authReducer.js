import { AUTH_ERROR, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "../types";

const handlers = {
    [AUTH_START]: (state) => ({...state, loading: true}),
    [AUTH_SUCCESS]: (state, {payload}) => ({...state, loading: false, name: payload.name, success: true, isAuth: true}),
    [AUTH_ERROR]: (state, {payload}) => ({...state, loading: false, error: payload.error}),
    [AUTH_LOGOUT]: (state) => ({...state, loading: false, name: '', success: false, isAuth: false, error: null}),
    DEFAULT: state => state
}

export const authReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
}