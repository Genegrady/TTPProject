import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Nav from './Components/Nav';
import {useDispatch} from 'react-redux';
import userActions from './redux/actions'

const App = (props) => {

const dispatch = useDispatch();

useEffect(() => {
  if(localStorage.token){
    dispatch(userActions.persistUser())
  }
}, [dispatch])
console.log(userActions.persistUser())
  return (
    <Router>
      <Nav />
      <Routes  {...props}/>
    </Router>
  );
};

export default App;