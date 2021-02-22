import classes from './Layout.module.scss'
import React from 'react'

const Layout = ({children, style}) => {
    return(
        <div className = {classes.Layout}>
            <div className = {classes.Layout__Center} style = {style}>
                {children}
            </div>
        </div>
    )
}

export default Layout;