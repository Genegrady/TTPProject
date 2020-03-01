import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Nav from './Components/Nav';
import {useDispatch} from 'react-redux';
import userActions from './redux/actions'
import history from './history';


const App = (props) => {

const dispatch = useDispatch();

useEffect(() => {
  if(localStorage.token){
    dispatch(userActions.persistUser())
  }
}, [dispatch])
console.log(history)
  return (
    <Router>
      <Nav />
      <Routes  history ={history} {...props}/>
    </Router>
  );
};

export default App;