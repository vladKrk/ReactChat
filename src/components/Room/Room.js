import classes from './Room.module.scss';
import React from 'react'

const Room = () => {
    return <div className = {classes.Room}>
        <div className = {classes.Room__Photo}>
        </div>
        <div className = {classes.Room__Info}>
            <div className = {classes.Room__Info__Name}>Name</div>
            <div className = {classes.Room__Info__LastMessage}>LastMessageText</div>
        </div>
    </div>
}

export default Room;