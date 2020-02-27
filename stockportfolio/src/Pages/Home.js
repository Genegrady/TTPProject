import React from 'react';
import { useSelector } from 'react-redux';
import { Fragment, useState, useEffect } from 'react';
import PurchaseStocks from '../Components/PurchaseStocks'

const Home = (props) => {
  const email = useSelector(state => state.email);
  const user = useSelector(state => state.user);
  // const user = useSelector(state => state.login.user);
//   const [userState, setUserState] =useState({user: user})
//   useEffect(() => {
//     setUserState(user)
// }, [user])

  console.log(user)
  const text = user ? (
    <div>
      
    <h1>{user.name} is currently logged in</h1>
    <h2>Balance is: ${parseFloat(user.balance).toFixed(2)}</h2>
    <PurchaseStocks/>
    </div>
   ) : (
    <h1>Nobody is logged in</h1>
  );
  return <div>{text}</div>;
};

export default Home;