import React, { useState, useContext } from 'react';  
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

import { Context } from '../context/PostContext'

const SelectFilterSort = ({selectedFilter, selectedSort}) => {
    
    const {filterPostsByStatus, sortPostsByCondition} = useContext(Context);

    const initialSortedBy = {
        sorted_by: selectedSort
    };

    const initialFilteredBy = {
        filtered_by: selectedFilter
    };

    const [selectedSortedBy, setSelectedSortedBy] = useState(initialSortedBy);
    const [selectedFilteredBy, setSelectedFilteredBy] = useState(initialFilteredBy);

    return (
        <View>  
            <Text style={styles.label}>Sorted by: </Text>
            <Picker
                 selectedValue={selectedSortedBy.sorted_by}
                 onValueChange={(itemValue) =>
                     {
                        setSelectedSortedBy({sorted_by: itemValue});
                        sortPostsByCondition(itemValue);

                     }
                }
            >
                <Picker.Item label="Default" value="id" />
                <Picker.Item label="Title" value="title" />
                <Picker.Item label="Published at" value="published_at" />
            </Picker>
            <Text style={styles.label}>Filter by Status: </Text>
            <Picker
                selectedValue={selectedFilteredBy.filtered_by}
                onValueChange={(itemValue) =>
                    {
                        setSelectedFilteredBy({filtered_by: itemValue});
                        filterPostsByStatus(itemValue);
                    }
               }
            >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Published" value="published" />
                <Picker.Item label="Unpublished" value="unpublished" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        margin: 5,
    },
});

export default SelectFilterSort;