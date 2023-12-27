import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'react-toastify/dist/ReactToastify.css'

import { fetchCategory } from '../../redux/slices/products/CategoriesSlice'
import AdminSidebar from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import {
  fetchProducts,
  deleteProduct,
  createProduct,
  Product,
  updateProduct
} from '../../redux/slices/products/productSlice'

export default function Products() {
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const { error, isLoading, products } = useSelector((state: RootState) => state.productsReducer)
  const [isAddProduct, setIsAddProduct] = useState(false)

  const initialProduct = {
    name: '',
    price: 0,
    quantity: 0,
    image: undefined,
    shipping: 0,
    description: '',
    categoryId: ''
  }

  const [newProduct, setNewProduct] = useState<Product>(initialProduct)

  const [isEdit, setIsEdit] = useState(false)
  const [editProduct, setEditProduct] = useState({name: '', description:'',price: 0, quantity: 0 })

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategory())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const handleDelete = async (slug: string) => {
    try {
      const response = await dispatch(deleteProduct(slug))
      toast.success(response.payload.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddProduct = async (event: FormEvent) => {
    try {
      event.preventDefault()

      const formData = new FormData()
      formData.append('name', newProduct.name)
      formData.append('image', newProduct.image as Blob)
      formData.append('description', newProduct.description)
      formData.append('categoryId', newProduct.categoryId)
      formData.append('price', String(newProduct.price))
      formData.append('quantity', String(newProduct.quantity))
      formData.append('shipping', String(newProduct.shipping))
      // for (const [key,value] of formData){console.log(key, value)}

      const response = await createProduct(formData)
      console.log(response)
      setNewProduct(initialProduct)
      setIsAddProduct(false)
      toast.success('Product added successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target

    if (type === 'file') {
      const fileInput = event.target as HTMLInputElement
      setNewProduct((prevProduct) => {
        return { ...prevProduct, [name]: fileInput.files?.[0] } // optional chaining ?.
      })
    } else {
      const isNumber = name === 'price' || name === 'quantity' || name === 'shipping'
      if (isNumber) {
        setNewProduct({
          ...newProduct,
          [name]: Number(value)
        })
        return
      }

      setNewProduct({
        ...newProduct,
        [name]: value
      })
    }
  }

  const handleCategory = (categoryId: string) => {
    setNewProduct({
      ...newProduct,
      ['categoryId']: categoryId
    })
    return
  }

  const handleEdit = (id: string) => {
    setIsEdit(true)
    const foundProduct = products.find((product) => product._id === id)
    if (foundProduct) {
      setEditProduct(foundProduct)
    }
  }

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const isPrice = name === 'price' || 'quantity'
    if (isPrice) {
      setEditProduct((prevData) => {
        return { ...prevData, [name]: Number(value) }
      })
    }

    setEditProduct((prevData) => {
      return { ...prevData, [name]: value }
    })
  }

  const handleEditSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()
      setIsEdit(false)
      await dispatch(updateProduct(editProduct))
      toast.success('Product Data Updated Successfully!')
    } catch (error) {
      toast.error('Soemthing went wrong.')
    }
  }

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="admin__container">
        <AdminSidebar />
        <div className="admin__main-content">
          <h2>Create a product</h2>
          {!isAddProduct && (
            <p id="product-add" onClick={() => setIsAddProduct(true)}>
              <i className="fa-solid fa-circle-plus " onClick={() => setIsAddProduct(true)}></i> Add
              product
            </p>
          )}
          {isAddProduct && (
            <>
              <Form onSubmit={handleAddProduct}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Product Name"
                    value={newProduct.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control type="file" name="image" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter Product Description"
                    value={newProduct.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Enter Product Qunatity"
                    value={newProduct.quantity <= 0 ? '' : newProduct.quantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Shipping Price (Optional)</Form.Label>
                  <Form.Control
                    type="number"
                    name="shipping"
                    placeholder="Enter the price of shipping"
                    value={newProduct.shipping <= 0 ? '' : newProduct.shipping}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Enter Product Price"
                    value={newProduct.price <= 0 ? '' : newProduct.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Label htmlFor="categories">Choose Categories:</Form.Label>
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <>
                        <Form.Group className="mb-3" key={category._id}>
                          <Form.Check
                            type="radio"
                            name="categoryId"
                            value={category._id}
                            label={category.name}
                            onChange={() => handleCategory(category._id)}
                          />
                        </Form.Group>
                      </>
                    )
                  })}

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          )}
          {isEdit && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  value={editProduct.name}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter Product Description"
                  value={editProduct.description}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Enter Product Price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  placeholder="Enter Product Price"
                  value={editProduct.quantity}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}

          <h2>List of products</h2>
          <section>
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <div key={product._id}>
                    <Table responsive="sm">
                      <thead className="products__table">
                        <tr>
                          <th>Slug</th>
                          <th>Product Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Delete</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody className="products__table">
                        <tr>
                          <td>{product.slug}</td>
                          <td>
                            <img
                              className="admin__product-img"
                              src={product.image as string}
                              alt={product.name}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.description}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <i
                              className="fa-solid fa-trash"
                              id="product-detail__delete"
                              onClick={() => handleDelete(String(product.slug))}></i>
                          </td>
                          <td>
                            <i
                              className="fa-solid fa-pen-to-square"
                              id="product-detail__edit"
                              onClick={() => handleEdit(product._id)}></i>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )
              })}
          </section>
        </div>
      </div>
    </div>
  )
}
