import React, {useEffect} from 'react';
import './App.css';
import Imessage from "./pages/Imessage";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, login, logout} from "./features/userSlice";
import Login from "./pages/Login";
import {auth} from "./firebase";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    useEffect(() =>{
        auth.onAuthStateChanged(authUser => {
            if (authUser){
                //user is logged in
                dispatch(login({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    username: authUser.displayName,
                    email: authUser.email,
                }))
            }
            else {
                //user is logged out
                dispatch(logout())
            }
        })
    },[])
  return (
    <div className="App">
        {user ? (<Imessage/>) : (<Login/>) }

    </div>
  );
}

export default App;
