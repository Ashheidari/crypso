import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    mode : 'light',
    user : null,
    token : null,
    posts : []
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setMode : (state) =>{
            state.mode = state.mode ==='light' ? 'dark' : 'light'; 
        },
        setLogin : (state,action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogut : (state) =>{
            state.user = null;
            state.token = null;
        },
        setFriends : (state,action) =>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            console.error('user non-existed :(');
        },
        setPosts : (state, action)=>{
            state.posts = action.payload.posts
        },
        setPost : (state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.postId){return action.payload.post}
                return post
            })
            state.posts = updatedPosts
        }
    }
})

export const {setMode, setLogin, setLogut, setFriends, setPosts, setPost} = authSlice.actions;

export default authSlice.reducer