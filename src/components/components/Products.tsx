import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/slices/products/productSlice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export default function Products() {

const {error , isLoading , products} = useSelector((state : RootState) => state.productsReducer);  

const dispatch: AppDispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchProducts())
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
    <h2>Create a product</h2>
    <p>form goes here</p>
    <h2>List of products</h2>
    <section>
      {products.length > 0 && products.map((product)=>{
        return(
          <div key={product.id}>
            <Table responsive="sm">
            <thead>
          <tr>
            <th>id</th>
            <th> </th>
            <th>Product Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Variance</th>
            <th>Sizes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.id}</td>
            <td><input type="checkbox" /></td>
            <td><img className='admin__product-img' src={product.image} alt="" /></td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.variants}</td>
            <td>{product.sizes}</td>
          </tr>
          
        </tbody>
      </Table>
      
          </div>
        )
      })}
    </section>

    </div>
  </div>
  )
}
