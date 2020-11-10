import React, {useState, useCallback, useMemo, useEffect} from 'react';
import './App.css';
import MiseEnPageDiscussion from './components/pageDiscussion/miseEnPage';
import MepIdentification from './components/identification/identification';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const styleTheme = {
   dark:{
     background: '#000',
     color: '#FFF'
   },
   white:{
     background: '#FFF',
     color: '#000'
   },
   blue:{
     background: 'rgb(187, 235, 251);',
     color: '#000'
   }
}

export const StyleThemeContext = React.createContext({
  theme: styleTheme.dark,
  toggleTheme: () => {}
})

function App() {

  const [theme, setTheme] = useState('white')
  const toggleTheme = useCallback(function(){
    setTheme(t => t === 'white' ? 'dark' : 'white')
  }, [])

  const value = useMemo(function(){
    return {
      theme: theme === 'white' ? styleTheme.white : styleTheme.dark,
      toggleTheme
    }
  }, [toggleTheme, theme])

  useEffect(() => {
    if(theme === 'white'){
      document.body.style.background = "#FFF";
        document.body.style.color = "#000";} else
    {  document.body.style.background = "#000";
    document.body.style.color = "#FFF";}
  },[theme])


  return (
    <div>
    <Router>

        <StyleThemeContext.Provider value={value}>
            <Route path="/" exact component={MepIdentification} />
            <Route path="/discussion" exact component={MiseEnPageDiscussion} />

        </StyleThemeContext.Provider>
    </Router>
    </div>
  );
}

export default App;
