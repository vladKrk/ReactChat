import React, { useReducer } from 'react'
import { AUTH_START, AUTH_SUCCESS } from '../types'
import { AuthContext } from './authContext'
import { authReducer } from './authReducer'

export const AuthState = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        name: '',
        loading: false,
        error: null,
        success: false
    })

    const auth = async (name) => {
        dispatch({
            type: AUTH_START
        });
        
        //Обращение к серверу

        dispatch({
            type: AUTH_SUCCESS,
            payload: {name}
        })

    }

    return (
        <AuthContext.Provider value = {{
            state,
            auth
        }}>
            {children}
        </AuthContext.Provider>
    )
}