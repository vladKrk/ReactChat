import classes from './Chat.module.scss'
import React from 'react'
import RoomsList from './RoomsList/RoomsList'
import Header from '../../components/Header/Header'
import Texting from './Texting/Texting'

const Chat = () => {
    return <div className = {classes.Chat}>
        <div className = {classes.Chat__Left}>
            <div className = {classes.Chat__Left__Head}>
                <button>+</button>
            </div>
            <div className = {classes.Chat__Left__Content}>
                <RoomsList/>
            </div>
        </div>
        <div className = {classes.Chat__Right}>
            <Header title = 'Chat'/>
            <div className = {classes.Chat__Right__TextingAndOnline}>
                <div className = {classes.Chat__Right__TextingAndOnline__MiddlePanel}>
                    <Texting/>
                </div>
                <div className = {classes.Chat__Right__TextingAndOnline__RightPanel}>
                    ActiveUsers
                </div>
            </div>
        </div>
    </div>
}

export default Chat;