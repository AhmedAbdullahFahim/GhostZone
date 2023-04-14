import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './screens/stack/SignInScreen';
import SignUpScreen from './screens/stack/SignUpScreen';
import ResetPasswordScreen from './screens/stack/ResetPasswordScreen';
import NewPasswordScreen from './screens/stack/NewPasswordScreen';
import VerificationScreen from './screens/stack/VerificationScreen';

/*
  to do:
    - transition between screens on figma is cool tbh...
    - add email verification screen for password reset: conditional rendering between email and phone number verification
    - check the files for unnecessary lines
    
  issues:
    - KeyboardAvoidingView not working
    - Verification cell styling is not really that accurate
    - Fontfamily doesn't work
*/

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signin" component={SignInScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Reset" component={ResetPasswordScreen} />
          <Stack.Screen
            name="CreateNewPassword"
            component={NewPasswordScreen}
          />
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
