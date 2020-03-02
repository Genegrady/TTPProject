import React from 'react'
import styled from 'styled-components';

export const Transaction = (props) => {
    console.log(props.ticker)
    const {ticker, price, quantity} = props

    const StyledCard = styled.div`
    display: inline-block;
  /* align-content: flex-end; */
  border: 1px solid dimgrey ;
  width: 500px;
  height: 110px;
  text-align: center;
`
    const StyledP = styled.p`
  padding-left: 10%;
  padding-right: 10%;
  text-align: center;
  font: 16px Arial, Helvetica, sans-serif;

`
    return (
        <StyledCard>
            <StyledP>Stock: {ticker}</StyledP>
            <StyledP>Price: ${price}</StyledP>
            <StyledP>Quantity: {quantity}</StyledP>
        </StyledCard>
    )
}
export default Transaction