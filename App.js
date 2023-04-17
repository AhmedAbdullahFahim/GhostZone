import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from './screens/stack/SignInScreen';
import SignUpScreen from './screens/stack/SignUpScreen';
import ResetPasswordScreen from './screens/stack/ResetPasswordScreen';
import NewPasswordScreen from './screens/stack/NewPasswordScreen';
import VerificationScreen from './screens/stack/VerificationScreen';
import SubscriptionPlanScreen from './screens/stack/SubscriptionPlanScreen';
import HomeTabScreen from './screens/tab/HomeTabScreen';

/*
  to do:
    - transition between screens on figma is cool tbh...
    - add email verification screen for password reset: conditional rendering between email and phone number verification
    - check the files for unnecessary lines
    -Bottom Tab Navigation:
      o React Native SVG
      o Export possible SVG files from figma
      o See the docs on how to add a custom icon to the bottom tab navigation
      o The file that I can't export, get a FA icon for it instead "file-lines"
      o Style the tab
      o Style the icons (active ? white : gray)
    
  issues:
    - Couldn't get the svg for the password icon as I can't export the icon without the 'rectangle' layer.
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
          {/*<Stack.Screen name="Signin" component={SignInScreen} />
           <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Reset" component={ResetPasswordScreen} />
          <Stack.Screen
            name="CreateNewPassword"
            component={NewPasswordScreen}
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
          />
          {/* <Stack.Screen
            name="SubscriptionPlanScreen"
            component={SubscriptionPlanScreen}
          /> */}
          <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
