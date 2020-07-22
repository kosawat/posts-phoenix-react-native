import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PostForm from '../components/PostForm';
import {Context} from '../context/PostContext';

const EditScreen = ({navigation, route}) => {
    const id = route.params.id;
    const {state, editPost} = useContext(Context);

    const post = state.posts.find(
        post => post.id === id);

    return (
        <View>
            <Text style={styles.label}>Post id: {id}</Text>
            <PostForm
                initialValues={{title: post.title, body: post.body, status: post.status, published_at: post.published_at}} 
                onSubmit={(title, body, status, published_at ) => {
                    editPost(id, title, body, status, published_at, () => navigation.navigate('Home'));
                }} />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginLeft: 5,
        margin: 10,
    }
    
});

export default EditScreen;
