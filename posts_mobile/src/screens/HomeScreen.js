import React, { useContext, useEffect } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    FlatList,
} from 'react-native';

import { Context } from '../context/PostContext'


const HomeScreen = ({navigation}) => {
    const {state, getPosts, deletePost} = useContext(Context);

    useEffect(() => {
        getPosts();

        const listener = navigation.addListener('focus', () => {
            getPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    navigation.setOptions({
        headerRight: () => (
            <Button 
                title = "Create Post"
                onPress={() => navigation.navigate('Create')}
            />
        )
    });

    return (
        <View>
            <View>
                <FlatList
                    data={state}
                    keyExtractor={post => post.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Display', {id: item.id})}>
                                <View style={styles.row}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Button title="Delete" onPress={() => deletePost(item.id)} />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    title: {
        fontSize: 18,
    },
    info: {
        marginLeft: 5
    }
});

export default HomeScreen;
