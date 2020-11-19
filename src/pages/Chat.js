import React, {useEffect, useState} from 'react';
import "../styles/chat.css"
import MicIcon from '@material-ui/icons/Mic';
import {IconButton} from "@material-ui/core";
import Messages from "../components/Messages";
import {selectChatName, selectChatId} from "../features/chatSlice";
import {useSelector} from "react-redux"
import db from "../firebase";
import firebase from "firebase";
import {selectUser} from "../features/userSlice";
import FlipMove from "react-flip-move";

function Chat(props) {

    const user = useSelector(selectUser);
    const chatId = useSelector(selectChatId)
    const chatName = useSelector(selectChatName)
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        if(chatId){
            db.collection('chats')
                .doc(chatId).collection('messages')
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot) =>
                    setMessages(
                        snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                    )
                );
        }
    },[chatId]);

    const sendMessage = e =>{
        e.preventDefault();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            username: user.username,
        })

        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <h4>To: <span className="chat-name">{chatName}</span></h4>
                <strong>Details</strong>
            </div>

            <div className="chat-messages">
                <FlipMove>
                    {messages.map(({id, data}) =>(
                        <Messages key={id} contents={data}/>
                    ))}
                </FlipMove>
            </div>

            <div className="chat-input">
                <form>
                    <input type="text"
                           placeholder="iMessage"
                           value={input}
                           onChange={(e)=>setInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton>
                    <MicIcon className="mic"/>
                </IconButton>
            </div>
        </div>
    );
}

export default Chat;