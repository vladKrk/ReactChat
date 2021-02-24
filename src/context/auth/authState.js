import React, { useReducer } from "react";
import api from "../../services/serverApi";
import { AUTH_ERROR, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS } from "../types";
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";

export const AuthState = ({ children }) => {
  const localName = localStorage.getItem("name");

  const [state, dispatch] = useReducer(authReducer, {
    name: "" || localName,
    loading: false,
    error: null,
    success: false,
    isAuth: !!localName,
  });

  const auth = async (name) => {
    dispatch({
      type: AUTH_START,
    });

    const res = await api.signUp({ name });
    const data = res.data;
    if (res.status === "error") {
      dispatch({
        type: AUTH_ERROR,
        payload: { error: data.error },
      });
    } else {
      localStorage.setItem("name", name);
      dispatch({
        type: AUTH_SUCCESS,
        payload: { name },
      });
    }
  };

  const logout = (name) => {
    localStorage.removeItem("name");
    api.logout({name})
    dispatch({
      type: AUTH_LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        auth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
