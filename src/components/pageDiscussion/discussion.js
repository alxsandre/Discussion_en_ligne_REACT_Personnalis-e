import React, {useState, useEffect, useContext} from 'react';
import io from 'socket.io-client';
import './discussion.css';
import {StyleThemeContext} from './../../App'

const socket = io.connect('http://localhost:8000')
export default socket;

//Reçoit les messages de socket.io et l'envoit pour des fonctions
function useMessagesReceived (){

  const [chat, setChat] = useState([])

  useEffect(() =>{
    socket.on('chat message', (message) =>{
      setChat(chat => {
        return [...chat, {message}]})
    });
     return function(){  socket.close()}
  }, [])

//Affiche le dernier message dans le titre de la page
  useEffect(() => {
    let longueurDuTableau = chat.length
    document.title = longueurDuTableau === 0 ? "": chat[longueurDuTableau -1].message
  }, [chat])


    return(
      chat
    )

}




//Affiche les messages
export function MessagesFromIO (){
      const chat = useMessagesReceived()


      const renderChat = () => {
        return chat.map(({message}, index) => (
          <li id="messages" key={index}>
              {message}
          </li>
        ))
      }

      return(
            <ul>{renderChat().reverse()}</ul>
      )
}




export function SendMessagesToIO (props){

  //Import Context dans la fonction, puis dans input rajoute au style la valeur avec value
  const {theme} = useContext(StyleThemeContext)

  const handleChange = (e) => {
    props.onHandleMessageChange( e.target.value)
  }

  return (

      <form onSubmit={props.onMessageSubmit}>
      <input
        style = {theme}
        placeholder="Type your text here"
        className="inputClass"
        type="text"
        onChange={handleChange}  value={props.inputState}/>
      </form>

  )

}
