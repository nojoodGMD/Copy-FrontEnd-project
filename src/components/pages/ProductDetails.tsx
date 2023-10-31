import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";
import { findProduct } from '../../redux/slices/products/productSlice';
import { AppDispatch, RootState } from '../../redux/store';


export default function ProductDetails() {

  const navigate = useNavigate();
  const {id} = useParams();

  const {error , isLoading , singleProduct} = useSelector((state : RootState) => state.productsReducer);  

  const dispatch: AppDispatch = useDispatch()
  useEffect(()=>{
  dispatch(findProduct(Number(id)))
  },[])

  if(isLoading){
  return <p>Loading ...</p>
  }

  if(error){
  return <p>{error}</p>
  }

  const handleGoBack = () =>{
    navigate('/')
  }

  console.log(singleProduct)

  return (
    <>
      <h2 className='product-details__header'>Product details</h2>
      {singleProduct && 
      <div className='product-details'>
        <img src={singleProduct.image} alt={singleProduct.name} />
        <p className='product-detail__title'>{singleProduct.name}</p>
        <p className='product-detail__description'>{singleProduct.description}</p>
        <p>{singleProduct.variants.join(", ")}</p>
        <p className='product-detail__price'>{singleProduct.price} SAR</p>
        {/* <p>Category: {singleProduct.categories.join(", ")}</p> */}
        <button>Buy</button>
        <button onClick={handleGoBack}>Back to Shopping</button>
      </div>}
      
    </>
  )
}
