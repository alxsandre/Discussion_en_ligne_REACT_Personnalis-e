import './toolbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPalette, faFont, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { config } from "@fortawesome/fontawesome-svg-core";
import React, {useState, useContext} from 'react';
import {StyleThemeContext} from './../App';


config.autoAddCss = false;


//Fonction pour toggler les elements
function useToggle(initialValue = false){
   const [value, setValue] = useState(initialValue)
   const toggle = function(){
     setValue(v => !v)
   }
   return [value, toggle]
}



function Toolbar(props){
  const [toggle1, toggle2] = useToggle(false)
  const {toggleTheme} = useContext(StyleThemeContext)


  return(
    <div className="menu">
    <FontAwesomeIcon icon={ faPalette} className="fa"  onClick ={toggleTheme}/>
    <FontAwesomeIcon icon={faFont} onClick={toggle2} className="fa"/>
    <FontAwesomeIcon icon={ faPaperPlane} className="fa" onClick={props.onMessageSubmit}/>
    {toggle1 && <ul className="liste-fonts" >
      <li className="police1"
      onClick={props.policeParisienne}> Police 1</li>
      <li className="police2"> Police 2</li>
    </ul> }
    </div>
  )
}

export default Toolbar;
