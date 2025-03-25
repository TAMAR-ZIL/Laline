import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  cartArr: [],
  totalSum: 0,
  cnt: 0
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let index = state.cartArr.findIndex(item => item._id === action.payload._id)
      if (index > -1) {
        state.cartArr[index].qty++;
      }
      else {
        state.cartArr.push({ ...action.payload, qty: 1 })
      }
      state.cnt++;
      state.totalSum = state.cartArr.reduce((total, item) => total + item.price * item.qty, 0);

    },
    deleteFromCart: (state, action) => {
      const index = state.cartArr.findIndex(item => item._id === action.payload);
      if (index > -1) {
        if (state.cartArr[index].qty > 1)
          state.cartArr[index].qty--;
        else
          state.cartArr.splice(index, 1);
        state.cnt--;
        state.totalSum = state.cartArr.reduce((total, item) => total + item.price * item.qty, 0);
      }
    },
    updateCartArr: (state, action) => {
      const index = state.cartArr.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.cartArr[index] = action.payload;
      }
    },
    clearCart: (state) => {
      state.cartArr = [];
      state.cnt = 0;
      state.totalSum = 0;
    }
  }
});
export const { addToCart, deleteFromCart, updateCartArr, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
