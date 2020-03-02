import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const LoginPage = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // controlled form functions
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(userActions.loginUserToDB(loginForm));
    // debugger
    props.history.push('/');
  };

  const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { email, password } = loginForm;

  // Creating our styled components  for our form

  const StyledForm = styled.form`
  font-family: 'Open Sans Condensed', arial, sans;
	width: 500px;
	padding: 30px;
	background: #FFFFFF;
	margin: 50px auto;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
	-moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
	-webkit-box-shadow:  0px 0px 15px rgba(0, 0, 0, 0.22);
  `
  const StyledHOne = styled.h1`
  background: #4D4D4D;
	text-transform: uppercase;
	font-family: 'Open Sans Condensed', sans-serif;
	color: #797979;
	font-size: 18px;
	font-weight: 100;
	padding: 20px;
	margin: -30px -30px 30px -30px;
  text-align: center;
  `
  const StyledInput = styled.input`
  box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	outline: none;
	display: block;
	width: 100%;
	padding: 7px;
	border: none;
	border-bottom: 1px solid #ddd;
	background: transparent;
	margin-bottom: 10px;
	font: 16px Arial, Helvetica, sans-serif;
	height: 45px;
  `
  const StyledSubmit = styled(StyledInput)`
  	background:linear-gradient(to bottom, #34CACA 5%, #30C9C9 100%);
	  background-color:#34CACA;
  `

  // Component code
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHOne>Login</StyledHOne>
      <StyledInput
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
      />
      <StyledInput
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      <StyledSubmit type="submit" />
      <Link to="/signup" className="btn btn-link">Signup</Link>
    </StyledForm>
    
  );
};

export default LoginPage;