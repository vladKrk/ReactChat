import classes from './Header.module.scss'
import React from 'react'

const Header = ({title}) => {
    return (
        <div className = {classes.Header}>
            <p>{title}</p>
        </div>
    )
}

export default Header;