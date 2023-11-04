import React from 'react'
import { ChangeEvent } from "react";


type SortItemProps={
    handleSort : (event: ChangeEvent<HTMLSelectElement>) => void
}

export default function SortItems({handleSort}:SortItemProps) {
  return (
    <>
        <div className="home__sort">
            <label htmlFor="sort-product">Sort By</label>
            <select name="sort-product" className='sort-bar' onChange={handleSort}>
                <option value="price" defaultValue="price">Price</option>
                <option value="name" >Name</option>
            </select>
        </div>
    </>
  )
}
