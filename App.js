import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './screens/stack/SignInScreen';
import SignUpScreen from './screens/stack/SignUpScreen';

/*
  to do:
    - transition between screens on figma is cool tbh...
    - make sure the keyboard doesn't show on top of the elements.
    - when password field is empty, setShowPassword(false)
    - font family
    - add email verification screen for password reset
*/

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signin" component={SignInScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
