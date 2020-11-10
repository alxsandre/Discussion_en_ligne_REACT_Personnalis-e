import React, {useState, useContext} from 'react';
import './identification.css';
import {StyleThemeContext} from './../../App'
import { useHistory } from 'react-router-dom';




function MepIdentification (){

  let history = useHistory();

  const goId = () => {

    console.log( {Pseudo: inputs.pseudo,
                 Password: inputs.password})

    const location = {
      pathname : '/discussion',
      state: {Pseudo: inputs.pseudo}
    }
    history.push(location)
  }

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(goId);


  return(

    <form onSubmit={handleSubmit} className="mepIdentification">


      <InputType
          handleInputChange={handleInputChange}
          value={inputs.pseudo || ""}
          inputName={"pseudo"}

           />

       <InputType
          handleInputChange={handleInputChange}
          value={inputs.password || ""}
          inputName={"password"}

            />

        <Button type="submit" > Go </ Button>




    </form>

  )
}

export default MepIdentification;


function InputType (props){

  //Import Context dans la fonction, puis dans input rajoute au style la valeur avec value
  const {theme} = useContext(StyleThemeContext)
  const font = [{fontFamily : props.police}]

  return (


      <input
        style = {{...theme,...font[0]}}
        placeholder={"Type your " +  props.inputName + " here"}
        name={props.inputName}
        className="inputClass inputIdentification"
        type="text"
        onChange={props.handleInputChange}
        value={props.value}
        required/>

  )
}

const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({})

  const handleSubmit = (event) => {
    if (event){
      event.preventDefault();
    }
    callback();
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name] : event.target.value}));
  }
  return {handleSubmit,
         handleInputChange,
         inputs};
}


function Button (props){
          return(
            <button> {props.children}</button>
          )
        }
