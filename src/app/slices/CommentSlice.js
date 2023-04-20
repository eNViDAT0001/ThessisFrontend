import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    listComment: [],
    metaInComment:{},
    addCommentForm:{
        files:[],
        descriptions:""
    }
}

const CommentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        resetComment:()=>initialState,
        setListComment : (state,action) =>
        {
            state.listComment = action.payload
        },
        setMetaInComment:(state,action)=>{
            state.metaInComment = action.payload
        },
        addFileInCommentFormInProductDetail:(state,action)=>{
            state.addCommentForm.files.push(action.payload)
        },
        setDescriptionsInCommentAddFormInProductDetail:(state,action)=>{
            state.addCommentForm.descriptions = action.payload
        }
    }
})

export const {
    addFileInCommentFormInProductDetail,
    setDescriptionsInCommentAddFormInProductDetail,
    
    setListComment,
    resetComment,
    setMetaInComment,
} = CommentSlice.actions
export default CommentSlice.reducer