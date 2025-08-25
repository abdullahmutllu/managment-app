import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page = 1) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?page=${page}`)
    if (!response.ok) throw new Error('Ürünler alınamadı')
    return response.json()
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Ürün silinemedi')
    return productId
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    message: '',
    status: '',
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 20 
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.items = action.payload.data || []
        state.message = action.payload.message || ''
        state.status = action.payload.status || ''
        state.pagination = {
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
          totalItems: action.payload.totalItems || 0,
          itemsPerPage: action.payload.itemsPerPage || Math.ceil((action.payload.totalItems || 0) / (action.payload.totalPages || 1))
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.items = []
        state.message = ''
        state.status = ''
      })
      
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(product => product.id !== action.payload)
        if (state.items.length === 0 && state.pagination.currentPage > 1) {
          state.pagination.currentPage = state.pagination.currentPage - 1
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default productsSlice.reducer