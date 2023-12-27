import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { toast } from 'react-toastify'

import { deleteAllItem, deleteItem } from '../../redux/slices/products/CartSlice'
import { AppDispatch, RootState } from '../../redux/store'

export default function Cart() {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const dispatch: AppDispatch = useDispatch()

  const handleRemove = (productId: string) => {
    dispatch(deleteItem(productId))
    toast.success('Item Removed From Cart.')
  }

  const handleRemoveAll = () => {
    dispatch(deleteAllItem())
  }

  const cartTotal = () => {
    let totalAmount = 0
    cartItems.length > 0 &&
      cartItems.map((cartItems) => {
        return (totalAmount = totalAmount + cartItems.price)
      })
    return totalAmount
  }

  return (
    <div className="main-container">
      <div className="cart-main">
        <Card.Title className="cart-title">Cart List</Card.Title>
        {cartItems.length > 0 && (
          <div className="cart-no-items">
            <p>Total Price: {cartTotal()}</p>
          </div>
        )}
        {cartItems.length === 0 && (
          <div className="cart-no-items">
            <p>There are no items in the cart yet.</p>
          </div>
        )}
        <div className="home-main-content">
          <section className="home__list-of-products">
            {cartItems.length > 0 &&
              cartItems.map((product) => {
                return (
                  <div key={product._id} className="home__signel-product">
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        className="home__product-img"
                        src={product.image as string}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {product.price} SAR
                        </Card.Subtitle>
                        <Card.Text>{product.description}</Card.Text>
                        <div className="cart__remove-item-btn">
                          <Button
                            variant="primary"
                            className="home__btn"
                            onClick={() => handleRemove(product._id)}>
                            Remove from Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                )
              })}
          </section>

          <div className="cart-remove-all">
            {cartItems.length > 0 && (
              <Button variant="primary" onClick={handleRemoveAll}>
                Remove All Items
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
