import React, {useEffect, useState} from 'react';
import "../styles/sidebar.css";
import SideBarChat from "./SideBarChat";
import {Avatar, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import db, {auth} from "../firebase";

function SideBar(props) {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(() =>{
        db.collection('chats').onSnapshot((snapshot) =>
            setChats(snapshot.docs.map((doc) =>({
                id: doc.id,
                data: doc.data(),
            }))
            ))
    },[]);

    const newChat = e =>{
        const chatName = prompt("Enter the chat name")
        if (chatName){
            db.collection('chats').add({
                chatName: chatName,
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar className="avatar" src={user.photo} onClick={()=> auth.signOut()}/>
                <div className="sidebar-input">
                    <SearchIcon/>
                    <input placeholder="search"/>
                </div>
                <IconButton variant="outlined" className="sidebar-button" onClick={newChat}>
                    <RateReviewOutlinedIcon />
                </IconButton>
            </div>

            <div className="sidebar-chats">
                {chats.map(({id, data:{chatName}}) => (
                    <SideBarChat key={id} id={id} chatName={chatName}/>
                ))}
            </div>
        </div>
    );
}

export default SideBar;