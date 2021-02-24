import React, { useContext } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Auth from '../containers/Auth/Auth'
import Broadcast from '../containers/Broadcast/Broadcast'
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

    const WrapperBroadcast = () => {
        return(<Layout><Broadcast/></Layout>)
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
                <Route path = '/broadcast/:id' component = {WrapperBroadcast} />
                <Redirect to = '/chat' exact/>
            </Switch>
        )
    }
}

export default AppRoute;