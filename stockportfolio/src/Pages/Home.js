import React from 'react';
import { useSelector } from 'react-redux';
import { Fragment, useState, useEffect } from 'react';
import PurchaseStocks from '../Components/PurchaseStocks'
import Portfolio from '../Pages/Portfolio'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';


const Home = (props) => {
  
  //Grab the state of the user from redux
  const user = useSelector(state => state.user);

  console.log(user)

  //Styled Components
  const StyledHOne = styled.h1`
  
	text-transform: uppercase;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #797979;
	font-size: 18px;
	font-weight: 100;
	padding: 20px;
	
  text-align: center;
  `
  const StyledHTwo = styled.h2`
  text-transform: uppercase;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #797979;
	font-size: 18px;
	font-weight: 100;
  text-align: center;
  
  `

  // Ternary to make sure user is logged in or else gives link to login or sign up page
  const text = user && localStorage.token ? (
    
    <div>
      
        <div>
      <StyledHOne>Welcome back {user.name}!</StyledHOne>
      <StyledHTwo>Cash Balance is: ${parseFloat(user.balance).toFixed(2)}</StyledHTwo>
        <PurchaseStocks {...user}/>
        </div>
        <div>
        <Portfolio {...user}/>
        </div>
    </div>
    
    
    
   ) : (
  <h1>Welcome to Stonkify! Please<Link to="/signup" className="btn btn-link">Signup</Link> or <Link to="/login" className="btn btn-link">Login</Link> if you have an account </h1>
  );
  return <div>{text}</div>;
};

// export default Home;
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Home);