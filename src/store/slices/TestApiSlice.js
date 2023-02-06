//https://api.publicapis.org/entries

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState= {
    loading: false,
    entries:[],
    error: '',
}

export const fetchTestApi = createAsyncThunk('api/fetchAPI',() =>{
    return fetch('https://api.publicapis.org/entries')
    .then((response) =>response.json())
})

const testApiSlice = createSlice({
    name:'test',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(fetchTestApi.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(fetchTestApi.fulfilled, (state,action) =>{
            state.loading= false
            state.entries = action.payload
            state.error= ''
        })
        builder.addCase(fetchTestApi.rejected,(state,action) =>{
            state.loading = false
            state.entries = []
            state.error = action.error.message
        })
    }
})

export default testApiSlice.reducer