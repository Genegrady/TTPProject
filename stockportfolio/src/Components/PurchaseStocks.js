import React from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import {IEX_CLOUD_API_BASE_URL, API_KEY, USERS_URL, TRANSACTION_URL } from '../redux/actions'
import userActions from '../redux/actions';
import { connect } from 'react-redux';

export const PurchaseStocks = (props) => {
    const dispatch = useDispatch()
    //Set states for transactions and user
    const [stockForm, setStockForm] = useState({
        ticker: '',
        quantity: 0,
        price: 0
    })
    // const [newPortfolio, setNewPortfolio] = useState({
    //     portfolio: {ticker: '',
    //     quantity: 0}
    // })
    const [userState, setUserState] = useState(props)
    useEffect(() => {
        setUserState(props.user)
    },[props]
    )
   
    const [transactionRender, setTransactionRender] = useState({
        transactions: []
    })
    const { ticker, quantity,  price } = stockForm;

    const user = userState
    const balance =parseFloat(props.balance).toFixed(2);

    const handleClick= (e) => {
        e.preventDefault();
        fetchTicker();
    }
    const fetchTicker = async () => {
        if(quantity !== 0){
            let url = IEX_CLOUD_API_BASE_URL + `${ticker}`+ API_KEY
            let results = await axios(
                url
            )
            // console.log
          setStockForm({
              ticker: ticker,
              quantity: quantity,
              price: (Math.round(results.data.latestPrice) * quantity)
          })
        }else{
            alert('Quantity must be at least 1')
        }
    }
    console.log(price)

    const handleTransactionSubmit = async () => {
        let user_id = props.id
        let url =  USERS_URL+ `${user_id}` + TRANSACTION_URL
        let userUrl = USERS_URL+ `${user_id}`
        let params = {
            ticker: ticker,
            quantity: quantity,
            price: price,
            user_id: user_id
        }
        let userParams ={
            balance: balance - price
        }
        if(price < balance){
            let results = await axios.post(
                url, params
            );setTransactionRender(results.data)
            // debugger
            let userResults = await axios.patch(
                userUrl, userParams
            );setUserState(userResults.data);
            dispatch({
                type: "ADD_TO_PORTFOLIO",
                payload: {
                    ticker: userResults.data.ticker,
                    quantity: userResults.data.quantity
                }
            }
            )
            console.log(userResults)
            // debugger
        }else{
            alert('Balance too low')
        }
        
    }
    

    const handleCancel = () => {
    setStockForm({
        ticker: '',
        quantity: 0,
        price: 0
    })
}


    
    

const handleTickerChange = e =>
    setStockForm({ ...stockForm, [e.target.name]: e.target.value.toUpperCase()});

const handleQuantityChange = e =>
    setStockForm({ ...stockForm, [e.target.name]: Math.round(e.target.value)});

console.log("ticker", ticker)
console.log("quantity", quantity)
// console.log(newPortfolio)

    return (
    <div>
     <form onSubmit={handleClick}>
        <input
          type="text"
          name="ticker"
          value={ticker}
          onChange={handleTickerChange}
          placeholder="Ticker"
        />
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Quantity"
        />
        <input type="submit" value='Get Quote'/>
      </form>
<form 
onSubmit={handleTransactionSubmit}
>
        <input
          type="text"
          name="ticker"
          value={ticker}
          onChange={handleTickerChange}
          placeholder="Ticker"
        />
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Quantity"
        />
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleQuantityChange}
          placeholder="Price"
        />
        <input type="submit" value='Purchase Stocks'/>
        <input type="button" value="Cancel"onClick={handleCancel}/>
      </form>
    </div>
      
    )
}

const mapStateToProps = state => {
  return { portfolio: state.newPortfolio };
};
export default connect(mapStateToProps)(PurchaseStocks);
