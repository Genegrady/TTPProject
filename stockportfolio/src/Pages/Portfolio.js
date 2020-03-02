import React from 'react'
import Stock from '../Components/Stock'
import PurchaseStocks from '../Components/PurchaseStocks'
import {useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import {IEX_CLOUD_API_BASE_URL, API_KEY, USERS_URL, TRANSACTION_URL } from '../redux/actions'
import axios from 'axios'

export const Portfolio = (props) => {
    // Set values for portfolio balance to be displayed and render our individual stocks to the DOM
    
    const balance = useSelector(state=> parseFloat(state.user.balance).toFixed(2))
    const [allTransactions, setAllTransactions] = useState({
    transactions: []
 })
    const fetchTransactions = async () => {
    let url = USERS_URL + `${props.id}` + TRANSACTION_URL
    if(localStorage.token){
        const result = await axios(
            url
        );setAllTransactions({
            transactions: result.data
        })
    }
}
// Like component did mount, we are using this to continually gather new data from the rails backend
useEffect(() => {
    fetchTransactions()
    
},[props.id]

)

// Function to add the price of all stocks together to show portfolio balance

let portfolioBalance = allTransactions.transactions.reduce(function(accumulator, currentValue,currentIndex, array){
    console.log(currentValue.price, accumulator)
    return accumulator + Math.trunc(currentValue.price)
}, 0)

//Function to reduce all individual transactions into singular objects that reflect the quantity of each stock owned

let stocks = [];
allTransactions.transactions.forEach(function (a) {
    if (!this[a.ticker]) {
        this[a.ticker] = { ticker: a.ticker, quantity: 0 };
        stocks.push(this[a.ticker]);
    }
    this[a.ticker].quantity += a.quantity;
}, Object.create(null));

// Rendering the information of all stocks into the Stock functional component

let renderStocks = () => {
    return stocks.map((stock,i) =>
        <Stock {...stock} key={i}/>
    )
}


// let renderStocks = Object.values(...allTransactions.transactions).reduce((acc,{ticker, quantity})=>{
//     acc[ticker] = {ticker, quantity: (acc[ticker] ? acc[ticker].quantity : 0) + quantity};
//     return acc
// }, {})


    // const portfolio = useSelector(state => Object.entries(state.portfolio))
    console.log(portfolioBalance)
    
    return (
        <div>
            <h1>Portfolio Balance: ${parseFloat(portfolioBalance).toFixed(2) + parseFloat(balance)}</h1>
            {renderStocks()}
        </div>
    )
}
export default Portfolio
