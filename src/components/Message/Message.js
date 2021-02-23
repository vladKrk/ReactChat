import classes from './Message.module.scss'
import React from 'react'

const Message = ({text, date, sender}) => {
    const cls = [classes.Message__NameAndDate__Name]
    if(sender === localStorage.getItem('name')) {
        cls.push(classes.owner);
    }
    return(<div className = {classes.Message}>
        <div className = {classes.Message__NameAndDate}>
            <div className = {cls.join(" ")}>
                {sender}
                </div>
            <div className = {classes.Message__NameAndDate__Date}>{date}</div>
        </div>
        <div className = {classes.Message__Text}>
            {text}
        </div>
    </div>)
}

export default Message;