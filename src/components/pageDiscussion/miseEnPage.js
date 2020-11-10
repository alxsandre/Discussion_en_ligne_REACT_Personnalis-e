import React, {useState} from 'react';
import socket from './discussion'
import {SendMessagesToIO, MessagesFromIO} from './discussion'
import Toolbar from '../toolbar';
import './miseEnPage.css';
import { useLocation } from 'react-router-dom';

function MiseEnPageDiscussion() {

  let location = useLocation();

  const [state, setStaet] = useState('')


  const handleMessageChange = (state) =>{
    setStaet(state)
  }
  const onMessageSubmit = (e) => {
    e.preventDefault()
    socket.emit('chat message', {pseudo: location.state.Pseudo, message: state});
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

      <SendMessagesToIO
      inputState={state}
      onHandleMessageChange={handleMessageChange}
      onMessageSubmit={onMessageSubmit}
      police={police}
      location={location}
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
