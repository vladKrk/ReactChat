import classes from './Input.module.scss'
import React from 'react'

const Input = ({name, type, placeholder, value, onChange}) => {

    return <div className = {classes.Input}>
        <input type={type} name={name} placeholder={placeholder} value = {value} onChange = {(e) => {onChange(e.target.value)}}/>
    </div>
}

export default Input;