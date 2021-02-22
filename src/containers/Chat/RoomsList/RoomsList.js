import classes from './RoomsList.module.scss'
import React from 'react'
import Room from '../../../components/Room/Room'

const RoomsList = ({rooms, activeRoom}) => {

    return <div className = {classes.RoomsList}>
        {rooms.map((room, index) => {
            return <Room key = {index} name = {room.name} isActive = {room.name === activeRoom}/>
        })}
    </div>
}

export default RoomsList;