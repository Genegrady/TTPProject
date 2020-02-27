import React from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import {IEX_CLOUD_API_BASE_URL, API_KEY } from '../redux/actions'

export const PurchaseStocks = (props) => {

    const dispatch = useDispatch()
    const [stockForm, setStockForm] = useState({
        ticker: '',
        quantity: 0,
        price: 0
    })
    const { ticker, quantity,  price } = stockForm;

    const user = useSelector(state => state.user);
    const balance = useSelector(user => parseFloat(user.balance));

    const handleClick= (e) => {
        e.preventDefault();
        fetchTicker();
    }
    const fetchTicker = async () => {
        if(stockForm.quantity > 0){
            let url = IEX_CLOUD_API_BASE_URL + `${ticker}`+ API_KEY
            let results = await axios(
                url
            )
            // console.log
          setStockForm({
              price: (results.data.latestPrice * quantity)
          })
        }
    }
    console.log(user.balance - price)
    
    

const handleTickerChange = e =>
    setStockForm({ ...stockForm, [e.target.name]: e.target.value.toUpperCase()});

const handleQuantityChange = e =>
    setStockForm({ ...stockForm, [e.target.name]: Math.round(e.target.value)});
    return (
        
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
    )
}

export default PurchaseStocks
