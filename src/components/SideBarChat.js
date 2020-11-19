import React, {useEffect, useState} from 'react';
import "../styles/sideBarchat.css";
import {Avatar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {setChat} from "../features/chatSlice";
import db from "../firebase";
import * as timeago from 'timeago.js';

function SideBarChat({id, chatName}) {
    const dispatch = useDispatch()
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(() =>{
        db.collection('chats').doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setChatInfo(snapshot.docs.map(doc => doc.data()))
            })
    },[id]);

    return (
        <div className="sidebar-chat"
             onClick={()=>{
                 dispatch(setChat({
                     chatId: id,
                     chatName: chatName,
                 })
            )}}>
            <Avatar src={chatInfo[0]?.photo}/>
            <div className="side-chat">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>
    );
}

export default SideBarChat;