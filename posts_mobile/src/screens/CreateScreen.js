import React, {useContext} from 'react';
import { StyleSheet} from 'react-native';

import PostForm from '../components/PostForm';
import {Context} from '../context/PostContext';

const CreateScreen = ({navigation}) => {
    const {addPost} = useContext(Context);

    return <PostForm onSubmit={(title, body, status, published_at) => {
        addPost(title, body, status, published_at, () => navigation.navigate('Home'));
    }} />;
    
};

const styles = StyleSheet.create({
    
});

export default CreateScreen;
