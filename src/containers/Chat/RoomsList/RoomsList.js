import classes from './RoomsList.module.scss'
import React from 'react'
import Room from '../../../components/Room/Room'

const RoomsList = () => {
    return <div className = {classes.RoomsList}>
        <Room/>
        <Room/>
        <Room/>
        <Room/>
        <Room/>
        <Room/>
        <Room/>
    </div>
}

export default RoomsList;