import {configureStore, createSlice} from '@reduxjs/toolkit'
/*Mainnnnnn */
const authSlice = createSlice({
    name:"auth",
    initialState: {isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            localStorage.removeItem("userId");
            state.isLoggedIn=false;
        }
    }
});

export const authAction = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
});