import React from 'react';  
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

const SelectFilterSort = () => {
    state = {
        language: 'java',
      };
    return (
        <View>  
            <Text>Sorted by: </Text>
            <Picker>
                <Picker.Item label="Title" value="title" />
                <Picker.Item label="Published at" value="published_at" />
            </Picker>
            <Text>Filter by status</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        margin: 10, 
        marginRight:5,
        justifyContent: 'space-between'
    },
    filter: {
        alignSelf:'flex-end',
    },
    sort: {

    },
});

export default SelectFilterSort;
