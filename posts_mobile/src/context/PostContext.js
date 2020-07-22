import createPostContext from './createPostContext'
import jsonApi from '../api/jsonApi';
import { Alert } from 'react-native';

let filteredState = {};

const postReducer = (state, action) => {
    switch (action.type) {
        case 'get_posts':
            return {...state, posts:action.payload};
        case 'delete_post':
            return {...state, posts:state.posts.filter((post) => post.id !== action.payload)};
        case 'filter_posts_by_status':
            return {...state, selectedFilter: action.payload};
        case 'sort_posts_by_condition':
            return {...state, selectedSort: action.payload};
        default: 
            return state;
    }
};

const sortPostsByCondition = dispatch => {
    return (condition) => {
        if (condition) {
            dispatch({type: 'sort_posts_by_condition', payload: condition});
        } else {
            dispatch({type: 'default'});
        }
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

        try {
            await jsonApi.post('/posts', { "post": { title, body, status, published_at} });
        } catch(err) {
            console.log(err);
            Alert.alert(title='Error', err.message.toString());
        }
        
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

const filterPostsByStatus = dispatch => {
    return  (status) => {
        if (status) {
            dispatch({type: 'filter_posts_by_status', payload: status});
        } else {
            dispatch({type: 'default'});
        }
    }; 
};


export const {Context, Provider} = createPostContext(
    postReducer, 
    {
        getPosts, 
        addPost,
        deletePost,
        editPost,
        filterPostsByStatus,
        sortPostsByCondition
    }, 
    []
);