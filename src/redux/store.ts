import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import CategoriesReducer from './slices/products/CategoriesSlice'
import UsersReducer from './slices/products/UsersSlice'

export const store = configureStore({
  reducer: {
    productsReducer: productsReducer,
    categoryReducer: CategoriesReducer,
    usersReducer: UsersReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
