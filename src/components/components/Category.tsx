import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/slices/products/productSlice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { fetchCategory } from '../../redux/slices/products/CategoriesSlice'

export default function Category() {

const {error , isLoading , categories} = useSelector((state : RootState) => state.categoryReducer);  

const dispatch: AppDispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchCategory())
},[])

if(isLoading){
  return <p>Loading ...</p>
}

if(error){
  return <p>{error}</p>
}


  return (
    <div className='admin__container'>
    <AdminSidebar/>
    <div className='admin__main-content'>
    <h2>Create a category</h2>
    <p>form goes here</p>
    <h2>List of Categories</h2>
    <section className='products'>
      {categories.length > 0 && categories.map((category)=>{
        return(
          <div key={category.id}>
            <p>Category name: {category.name}</p>
            <p>Category id: {category.id}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )
      })}
    </section>

    </div>
  </div>
  )
}
