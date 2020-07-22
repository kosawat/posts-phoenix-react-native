import React, { useContext, useEffect, useState } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    FlatList,
} from 'react-native';

import { Context } from '../context/PostContext'
import SelectFilterSort from '../components/SelectFilterSort';
import DateTime from '../components/DateTime';
import compareValues from '../utils/CompareValues';


const HomeScreen = ({navigation}) => {
    const {state, getPosts, deletePost} = useContext(Context);
    const [showFilterSort, setShowFilterSort] = useState(false);

    const filterSortPosts = (state) => {

        let filteredSortedPosts = [];

        // filter posts
        if (state.selectedFilter && state.selectedFilter !== 'all') {
            filteredSortedPosts = state.posts.filter((post) => post.status === state.selectedFilter );
        } else {
            filteredSortedPosts = state.posts;
        }

        // sort posts
        if (state.selectedSort) {
            filteredSortedPosts = filteredSortedPosts.sort(compareValues(state.selectedSort));
        }

        return(filteredSortedPosts);
    };

    useEffect(() => {
        getPosts();

        const listener = navigation.addListener('focus', () => {
            getPosts();
        });

        // clean up listener
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
                <TouchableOpacity onPress={() => {
                    showFilterSort ? setShowFilterSort(false) : setShowFilterSort(true) ;
                }}>
                    <Text style={styles.filterSort}>Filter / Sort</Text>
                </TouchableOpacity>
                    { showFilterSort && <SelectFilterSort selectedFilter={state.selectedFilter} selectedSort={state.selectedSort}/> }

                { (!state.posts || state.posts.length === 0)
                    ? // no post
                    <Text style={{...styles.title, marginLeft: 5}}>There is no post yet, it is time to create a post!</Text>
                    : // there are some posts
                    <FlatList
                        data={filterSortPosts(state)}
                        keyExtractor={post => post.id.toString()}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Display', {id: item.id})}>
                                    <View style={styles.container}>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Button title="Delete" onPress={() => deletePost(item.id)} />
                                    </View>
                                    
                                        <Text style={styles.info}>{item.status}</Text>
                                        { item.published_at && 
                                            <Text style={styles.info}>
                                                at <DateTime datetime={item.published_at} />
                                            </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'grey',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
    },
    info: {
        fontSize: 10,
        margin: 5
    },
    filterSort: {
        color: '#007aff',
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 5,
    }
});

export default HomeScreen;
