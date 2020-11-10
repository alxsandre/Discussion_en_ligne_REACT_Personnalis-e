import React, {useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import './discussion.css';
import {StyleThemeContext} from './../../App';
import { useLocation } from 'react-router-dom';

const socket = io.connect('http://localhost:8000')
export default socket;

//Reçoit les messages de socket.io et l'envoit pour des fonctions
function useMessagesReceived (){

  const [chat, setChat] = useState([{pseudo: "", message:""}])

  let location = useLocation();




  useEffect(() =>{
    socket.on('chat message', (message) =>{
      setChat(chat => {
        return [...chat, message]})
    });
     return function(){  socket.close()}
  }, [])


//Affiche le dernier message dans le titre de la page
  useEffect(() => {
    let longueurDuTableau = chat.length
    document.title = longueurDuTableau === 0 ? "": chat[longueurDuTableau -1].message
  }, [chat])


    return(
      [chat, location]
    )

}




//Affiche les messages
export function MessagesFromIO (props){
      const [chat, location] = useMessagesReceived()

      return(
        <div className="messageFlex">
            {chat.map(({pseudo, message}, index) => {
              if (pseudo === location.state.Pseudo) {
                return (<li id="messages"  key={index} >
                   {message}
                  </li>
                )
              }
              return (
                <li id="messages"   key={index} className="messagesRight">
                 {message}
                </li>
              )

            })}
        </div>
      )
}



export function SendMessagesToIO (props){

  //Import Context dans la fonction, puis dans input rajoute au style la valeur avec value
  const {theme} = useContext(StyleThemeContext)

  const handleChange = (e) => {
    props.onHandleMessageChange( e.target.value)
  }

  const font = [{fontFamily : props.police}]

  return (

      <form className="formDiscussion" onSubmit={props.onMessageSubmit}>
      <input
        style = {{...theme,...font[0]}}
        placeholder="Type your text here"
        className="inputClass"
        type="text"
        onChange={handleChange}  value={props.inputState}/>
      </form>

  )

}
