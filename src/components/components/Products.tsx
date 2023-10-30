import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/slices/products/productSlice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
    <section className='products'>
      {products.length > 0 && products.map((product)=>{
        return(
          <div key={product.id}>
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Button variant="primary">Edit</Button>
        <Button variant="primary">Delete</Button>
      </Card.Body>
    </Card>
          </div>
        )
      })}
    </section>

    </div>
  </div>
  )
}
