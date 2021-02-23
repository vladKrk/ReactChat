import classes from './Auth.module.scss'
import React, { useContext, useState } from 'react'
import Header from '../../components/Header/Header';
import Input from '../../components/UI/Input/Input';
import {AuthContext} from '../../context/auth/authContext';

const Auth = () => {

    const auth = useContext(AuthContext)

    const [name, setName] = useState('')
    return(
        <div className = {classes.Auth}>
           <Header title = 'Sign in'/>
            <form className = {classes.Auth__InputName}>
                <label>Enter a unique name to continue...</label>
                <Input type = 'text' placeholder = 'Name' name = 'name' value = {name} onChange = {setName}/>
                <button onClick = {(e) => {
                    e.preventDefault();
                    auth.auth(name)
                }}>Continue</button>
           </form>
        </div>
    )
}

export default Auth;