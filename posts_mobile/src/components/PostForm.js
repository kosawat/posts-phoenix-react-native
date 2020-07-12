import React, {useState} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    Button
} from 'react-native';
import dayjs from 'dayjs';

const PostForm = ({onSubmit, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title);
    const [body, setBody] = useState(initialValues.body);
    const status = initialValues.status;

    const PublishButton = ({status}) => {
        if (!status || status == 'unpublished') {
            const published_at = dayjs().format('YYYY-MM-YYTHH:mm:ss');
            return (
                <Button 
                title="Publish Post" 
                onPress={() => onSubmit(title, body, status='published', published_at)}
                />
            );
        } else {
            return null ;
        } 
        
    };
    return (
        <View>
            <Text style={styles.label}>Title:</Text>
            <TextInput 
                style={styles.input} 
                value={title} 
                onChangeText={(text) => setTitle(text)}
                placeholder="Title is required" 
            />
            <Text style={styles.label}>Body:</Text>
            <TextInput 
                style={{...styles.input, height: 200}} 
                value={body} 
                onChangeText={(text) => setBody(text)}
                multiline 
                maxLength={300}
                placeholder="Max 300 characters" 
            />
            <Button 
                title="Save Post" 
                onPress={() => onSubmit(title, body)}
            />
            <PublishButton status={status}/>
        </View>

    );
};

PostForm.defaultProps = {
    initialValues: {
        title: '',
        body: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
    }
});

export default PostForm;
