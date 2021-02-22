import classes from './Auth.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import Input from '../../components/UI/Input/Input';
import {AuthContext} from '../../context/auth/authContext';

const Auth = () => {

    const auth = useContext(AuthContext)

    const [name, setName] = useState('')
    return(
        <div className = {classes.Auth}>
           <Header title = 'Вход'/>
            <form className = {classes.Auth__InputName}>
                <label>Введите уникальное имя, чтобы продолжить</label>
                <Input type = 'text' placeholder = 'Имя' name = 'name' value = {name} onChange = {setName}/>
                <button onClick = {(e) => {
                    e.preventDefault();
                    auth.auth(name)
                }}>Продолжить</button>
           </form>
        </div>
    )
}

export default Auth;