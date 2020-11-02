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

//Fonctions pour changer la police grace à la toolbar
  const [police, setPolice] = useState('FredokaBold')
  const changePoliceParisienne = (police) =>{
    setPolice('parisienne')
    document.body.style.fontFamily = "parisienne"
  }
  const changePoliceFredokaBold = (police) =>{
    setPolice('FredokaBold')
    document.body.style.fontFamily = "FredokaBold"
  }


  return (
    <div id="conversation">
      <div className="center">

      <SendMessagesToIO inputState={state}
      onHandleMessageChange={handleMessageChange}
      onMessageSubmit={onMessageSubmit}
      police={police}
       />

      <MessagesFromIO />
      </div>
      <Toolbar
      onMessageSubmit={onMessageSubmit}
      changePoliceParisienne={changePoliceParisienne}
      changePoliceFredokaBold={changePoliceFredokaBold}/>
    </div>
  );
}

export default MiseEnPageDiscussion;
