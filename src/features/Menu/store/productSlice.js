import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMenuData = createAsyncThunk(
  'product/fetchMenuData',
  async (_, { rejectWithValue }) => {
    try {
      const { menuService } = await import('../services/menuService');
      const data = await menuService.fetchAndMapMenus();
      return data; // { categories, items }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  items: [],
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetMenuStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    toggleAvailability: (state, action) => {
      const { itemNo, isAvailable } = action.payload;
      const product = state.items.find(p => p.itemNo === itemNo);
      if (product) {
        product.isAvailable = isAvailable;
      }
    },
    changeStock: (state, action) => {
      const { itemNo, stock } = action.payload;
      const product = state.items.find(p => p.itemNo === itemNo);
      if (product) {
        product.stock = stock;
      }
    },
    updateProduct: (state, action) => {
      const { itemNo, isAvailable, stock } = action.payload;
      const product = state.items.find(p => p.itemNo === itemNo);
      if (product) {
        product.isAvailable = isAvailable;
        product.stock = stock;
      }
    },
    deleteProduct: (state, action) => {
      const itemNo = action.payload;
      state.items = state.items.filter(p => p.itemNo !== itemNo);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.categories = action.payload.categories;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch menu data';
      });
  }
});

export const { resetMenuStatus, addProduct, toggleAvailability, changeStock, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;

