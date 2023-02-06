import { createSlice } from '@reduxjs/toolkit'
import { ProductApi } from '../../api/ProductApi'



const initialState = {
    comment: {},
    commentPaging:{},
    filters:{
        marker: 1,
        limit: 3,
        "sorts[]": "id_DESC",
    }
}
const CommentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        resetComment:()=>initialState,
        setComment : (state,action) =>
        {
            state.comment = action.payload
        },
        setFilter: (state,action)=>{
            state.filters = action.payload
        },
        setCommentPaging:(state,action)=>{
            state.commentPaging = action.payload
        }
    }
})
export const fetchAllComment = (id) => async(dispatch) =>{
    try {
        const response = await ProductApi.GetComment(id)
        dispatch(setComment(response))
    } catch (error) {
        console.log(error)
    }
}
export const fetchCommentPaging = (id,filters) => async (dispatch) => {
    try {
        const response = await ProductApi.GetComment(id,filters)
        dispatch(setCommentPaging(response))
    } catch (error) {
        console.log(error)
    }
}


export const {
    setComment,
    setFilter,
    resetComment,
    setCommentPaging,
} = CommentSlice.actions
export default CommentSlice.reducer

