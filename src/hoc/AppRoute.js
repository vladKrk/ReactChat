import React, { useContext } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Auth from '../containers/Auth/Auth'
import Chat from '../containers/Chat/Chat'
import Layout from '../containers/Layout/Layout'
import { AuthContext } from '../context/auth/authContext'



const AppRoute = () => {
    const {authState} = useContext(AuthContext)
    const WrapperAuth = () => {
        return(
            <Layout style={{ width: "40%", height: "40%" }}>
                <Auth/>
            </Layout>
        )
    }

    const WrapperChat = () => {
        return(
            <Layout>
                <Chat/>
            </Layout>
        )
    }

    if(!authState.isAuth) {
        return (
            <Switch>
                <Route path = '/auth' component = {WrapperAuth}/>
                <Redirect to = '/auth'/>
            </Switch>
        )
    }
    else {
        return (
            <Switch>
                <Route path = '/chat' component = {WrapperChat} />
                <Route path = '/chat/:id' component = {WrapperChat}/>
                <Redirect to = '/chat' exact/>
            </Switch>
        )
    }
}

export default AppRoute;