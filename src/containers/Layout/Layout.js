import classes from './Layout.module.scss'
import React from 'react'
// import Header from '../../components/Header/Header'
// import Chat from '../Chat/Chat'

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