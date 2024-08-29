import { createSlice } from "@reduxjs/toolkit";
import Whishlist from "../pages/Whishlist";

const  wishlistSlice= createSlice({
    name:'wishlist',
    initialState:[],
    reducers:{
        // action are provided inside reducers, logic to update the  state
        addtoWishList:(state,action)=>{
            state.push(action.payload)
        },
        // to remove item from state
        removeFromWishlist:(state,action)=>{
            return state.filter(item=>item.id != action.payload)
        }
    }
})

export const {addtoWishList,removeFromWishlist}=  wishlistSlice.actions;
 export default wishlistSlice.reducer;