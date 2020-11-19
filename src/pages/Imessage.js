import React from 'react';
import "../styles/imessage.css";
import SideBar from "../components/SideBar";
import Chat from "./Chat";

function Imessage(props) {
    return (
        <div className="imessage">
            {/*sidebar*/}
            <SideBar/>
            {/*chat*/}
            <Chat/>
        </div>
    );
}

export default Imessage;