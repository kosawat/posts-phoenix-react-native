import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CreateScreen from './src/screens/CreateScreen';
import DisplayScreen from './src/screens/DisplayScreen';
import EditScreen from './src/screens/EditScreen';
import { Provider } from './src/context/PostContext';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{title: 'Posts'}}
        />
        <Stack.Screen 
          name="Create" 
          component={CreateScreen}
          options={{title: 'Create Post'}}
        />
        <Stack.Screen 
          name="Display" 
          component={DisplayScreen}
          options={{title: 'View Post'}}
        />
        <Stack.Screen 
          name="Edit" 
          component={EditScreen}
          options={{title: 'Edit Post'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => { 
  return ( 
      <Provider>
        <App />
      </Provider>
  ); 
};
