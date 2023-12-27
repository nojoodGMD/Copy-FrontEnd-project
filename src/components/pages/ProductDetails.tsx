import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { Product, fetchProducts, findProduct } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchCategory } from '../../redux/slices/products/CategoriesSlice'
import { ToastContainer, toast } from 'react-toastify'
import { addToCart } from '../../redux/slices/products/CartSlice'

export default function ProductDetails() {
  const navigate = useNavigate()
  const { slug } = useParams()

  const { error, isLoading, singleProduct } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categories } = useSelector((state: RootState) => state.categoryReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProduct(String(slug))))
    dispatch(fetchCategory())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const handleGoBack = () => {
    navigate('/')
  }

  const getCategoryNameById = (categoryId: string) => {
    const foundCategory = categories.find((cat) => cat._id === categoryId._id)
    return foundCategory ? foundCategory.name + ' ' : 'Category not found'
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success('Product Added to Cart.')
  }

  return (
    <>
      <div className="main-container">
        <ToastContainer />
        <h2 className="product-details__header">Product details</h2>
        {singleProduct && (
          <div className="product-details">
            <img src={singleProduct.image as string} alt={singleProduct.name as string} />
            <p className="product-detail__title">{singleProduct.name}</p>
            <p className="product-detail__description">{singleProduct.description}</p>
            <p>
              Category: {singleProduct.categoryId && getCategoryNameById(singleProduct.categoryId)}
            </p>
            <p className="product-detail__price">{singleProduct.price} SAR</p>
            <button onClick={() => handleAddToCart(singleProduct)}>Add to Cart</button>
            <button onClick={handleGoBack}>Back to Shopping</button>
          </div>
        )}
      </div>
    </>
  )
}
