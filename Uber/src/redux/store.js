import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

const store=configureStore({
   reducer:{
    userInfo:userReducer
   }
})
export default store