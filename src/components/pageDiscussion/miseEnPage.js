import React, {useState} from 'react';
import socket from './discussion'
import {SendMessagesToIO, MessagesFromIO} from './discussion'
import Toolbar from '../toolbar';
import './miseEnPage.css';

function MiseEnPageDiscussion() {

  const [state, setStaet] = useState('')

  const handleMessageChange = (state) =>{
    setStaet(state)
  }
  const onMessageSubmit = (e) => {
    e.preventDefault()
    socket.emit('chat message', state);
    setStaet('')

  }

  const policeParisienne = () =>{
      document.body.style.fontFamily = "parisienne"
  }

  return (
    <div id="conversation">
      <div className="center">

      <SendMessagesToIO inputState={state}
      onHandleMessageChange={handleMessageChange}
      onMessageSubmit={onMessageSubmit}
       />

      <MessagesFromIO />
      </div>
      <Toolbar onMessageSubmit={onMessageSubmit} policeParisienne={policeParisienne}/>
    </div>
  );
}

export default MiseEnPageDiscussion;
