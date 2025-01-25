import { createSlice } from "@reduxjs/toolkit";
const initialState={
    value:{username:'',password:'',mobileNop:''}
}
const user=createSlice({
    name:'userInfo',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.value.username=action.payload.username
            state.value.password=action.payload.password
            state.value.mobileNop=action.payload.mobileNop
        }
    }
})
export const {addUser}=user.actions
export default user.reducer