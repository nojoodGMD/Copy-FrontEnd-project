import React from 'react'
import {FaCartPlus} from 'react-icons/fa'

export default function CartIcon({value} : {value : number}) {
  return (
    <div className="cart-icon">
        <FaCartPlus className='cart-icon'/>
        <span className={value>0 ? "badge" : "no-badge"} >{value}</span>
    </div>
  )
}
