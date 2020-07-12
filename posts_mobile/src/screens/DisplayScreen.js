import React, {useContext} from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Button
} from 'react-native';

import { Context } from '../context/PostContext';
import dayjs from 'dayjs';

const DisplayScreen = ({navigation, route}) => {
    const id = route.params.id;
    const { state } = useContext(Context);
    const post = state.find((post) => post.id === id);
    
    navigation.setOptions({
        headerRight: () => (
            <Button title="Edit" onPress={() => navigation.navigate('Edit', {id})} />
        )
    });

    const DateTime = (data) => {
        if (data.datetime) {
            return dayjs(data.datetime).format('MMM D, YYYY h:mm A');
        } else {
            return null;
        }
    }

    return (
        <View>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.body}>{post.body}</Text>
            <View style={styles.info}>
            <Text>Status: {post.status}</Text>
            <Text>Created at: <DateTime datetime={post.created_at} /></Text>
            <Text>Updated at: <DateTime datetime={post.updated_at} /></Text>
            <Text>Published at: <DateTime datetime={post.published_at} /> </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        margin: 10
    },
    body: {
        fontSize: 18,
        marginLeft: 15,
        marginRight: 5,
    },
    info: {
        marginLeft: 15,
        margin: 10,
    }

});

export default DisplayScreen;
