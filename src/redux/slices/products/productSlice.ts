import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from './UsersSlice'
axios.defaults.withCredentials = true

export type Product = {
  _id?: string
  name: string
  slug?: string
  price: number
  quantity: number
  sold?: number
  image: string | File | undefined
  shipping: number
  description: string
  categoryId: string
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
  try {
    const response = await axios.get(`${baseURL}/products`)
    return response.data.payload.products
  } catch (error) {
    console.log(error)
  }
})

export const getSignleProdct = createAsyncThunk('products/getSignleProdct', async (slug : string) => {
  try {
    const response = await axios.get(`${baseURL}/productDetails/${slug}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const createProduct = async (newProduct: FormData) => {
  try {
    const response = await axios.post(`${baseURL}/products`, newProduct)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getOneProduct = async (slug: string) => {
  try {
    const response = await axios.get(`${baseURL}/productDetails/${slug}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}



export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    findProduct: (state, action) => {
      const slug = action.payload
      console.log(action)
      const foundProduct = state.products.find((product) => slug === product.slug)
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
    builder.addCase(fetchProducts.pending, (state, action) => {
      console.log('inside pending product')
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log('inside fulfil product')
      state.isLoading = false
      state.products = action.payload
    })
    builder.addCase(getSignleProdct.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload
    })
    // builder.addMatcher((action)=>action.type.endsWith('/pending'), (state) => {
    //   console.log('inside pending product')
    //   state.isLoading = true
    //   state.error = null
    // })
    builder.addMatcher((action)=>action.type.endsWith('/rejected'), (state, action) => {
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
