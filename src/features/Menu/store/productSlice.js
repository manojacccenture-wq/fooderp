import { createSlice } from '@reduxjs/toolkit';
import { MENU_PRODUCTS } from '../../../data/menuProducts';

const initialState = {
  items: MENU_PRODUCTS.map(item => ({
    ...item,
    isAvailable: item.isAvailable !== false,
    stock: item.stock || 'In Stock'
  })),
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
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
  }
});

export const { addProduct, toggleAvailability, changeStock, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;

