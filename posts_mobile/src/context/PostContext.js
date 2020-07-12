import createPostContext from './createPostContext'
import jsonApi from '../api/jsonApi';

const postReducer = (state, action) => {
    switch (action.type) {
        case 'get_posts':
            return action.payload;
        case 'delete_post':
            return state.filter((post) => post.id !== action.payload );
        default: 
            return state;
    }
};

const getPosts = dispatch => {
    return async () => {
        const response = await jsonApi.get('/posts');
        // response.data === ["data": { {}, {}, {} }]
        dispatch({type: 'get_posts', payload: response.data.data});     
    };
};

const addPost = dispatch => {
    return async (title, body, status, published_at, callback) => {
        await jsonApi.post('/posts', { "post": { title, body, status, published_at} });
        
        if (callback){
            callback();
        }
    };
};

const deletePost = dispatch => {
    return async (id) => {
        await jsonApi.delete(`/posts/${id}` );
        
        // also remove post from local state
        dispatch({ type: 'delete_post', payload: id });
    };
};

const editPost = dispatch => {
    return async (id, title, body, status, published_at, callback) => {
        
        await jsonApi.put(`/posts/${id}`, { "post": {title, body, status, published_at} });
        
        if (callback){
            callback();
        }
    };

};


export const {Context, Provider} = createPostContext(
    postReducer, 
    {
        getPosts, 
        addPost,
        deletePost,
        editPost
    }, 
    []
);