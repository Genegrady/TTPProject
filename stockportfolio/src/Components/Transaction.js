import React from 'react'

export const Transaction = (props) => {
    console.log(props.ticker)
    const {ticker, price, quantity} = props
    return (
        <div>
            <p>Stock: {ticker}</p>
            <p>Price: ${price}</p>
            <p>Quantity: {quantity}</p>
        </div>
    )
}
export default Transaction