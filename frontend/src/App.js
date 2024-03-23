//import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import React from 'react';
import './App.css';
import Principal from './Components/principal';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Editor from './Components/editorTexto';
function App() {

  return (
    <div className='App'>

          
          <div style={{ minHeight:"100vh" }} >
            <Principal />
          </div>


        
    </div>
  );
}

export default App;
