import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import axios from 'axios'
axios.defaults.withCredentials = true

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product
  searchTerm: string
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  singleProduct: {} as Product,
  searchTerm: ''
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  return response.data
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    findProduct: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => id === product.id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'price') {
        state.products.sort((a, b) => a.price - b.price)
      } else if (sortingCriteria === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload
      const filteredProducts = state.products.filter((product) => product.id !== id)
      if (filteredProducts) {
        state.products = filteredProducts
      }
    },
    addProduct: (state, action) => {
      const newProduct = action.payload
      state.products.push(newProduct)
    },
    editedProduct: (state, action) => {
      const id = action.payload.id
      const editedData: Product = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        if (editedData.variants && typeof editedData.variants === 'string') {
          editedData.variants = editedData.variants.split(',')
        }
        if (editedData.sizes && typeof editedData.sizes === 'string') {
          editedData.sizes = editedData.sizes.split(',')
        }
        foundProduct.name = editedData.name
        foundProduct.image = editedData.image
        foundProduct.description = editedData.description
        foundProduct.price = Number(editedData.price)
        editedData.sizes === ''
          ? (foundProduct.sizes = [])
          : (foundProduct.sizes = editedData.sizes)
        editedData.variants === ''
          ? (foundProduct.variants = [])
          : (foundProduct.variants = editedData.variants)
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'Error'
      state.isLoading = false
    })
  }
})

export const {
  findProduct,
  setSearchTerm,
  sortProducts,
  deleteProduct,
  addProduct,
  editedProduct
} = productSlice.actions
export default productSlice.reducer
