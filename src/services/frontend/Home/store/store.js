import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer
    }
  })
}

export const store = makeStore()