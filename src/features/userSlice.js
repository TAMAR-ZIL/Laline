import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.currentUser = action.payload;
        },
        logOut: (state) => {
            state.currentUser = null;
            state.cart = []
        }
    }
})

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;