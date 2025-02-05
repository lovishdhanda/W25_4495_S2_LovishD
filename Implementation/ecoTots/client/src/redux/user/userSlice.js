import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentUser: null, 
    error: null,
    loading: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => { //recieve data form the database
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
//creating function using in signin.jsx
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;