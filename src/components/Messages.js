import React, {forwardRef} from 'react';
import "../styles/messages.css";
import {Avatar} from "@material-ui/core"
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import * as timeago from "timeago.js";

//ES6 way of writing a function
const Messages = forwardRef (({id, contents:{timestamp, username, email, message, photo, uid}}, ref) => {
    const user = useSelector(selectUser);
    return (
        <div ref={ref} className={`messages ${user.email === email && "msg-sender"}`}>
            <Avatar className="msg-photo" src={photo}/>
            <p>{message}</p>
            <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
        </div>
    );
})

export default Messages;