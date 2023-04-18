import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';

import SignInScreen from './screens/stack/SignInScreen';
import SignUpScreen from './screens/stack/SignUpScreen';
import ResetPasswordScreen from './screens/stack/ResetPasswordScreen';
import NewPasswordScreen from './screens/stack/NewPasswordScreen';
import VerificationScreen from './screens/stack/VerificationScreen';
import SubscriptionPlanScreen from './screens/stack/SubscriptionPlanScreen';
import HomeTabScreen from './screens/tab/HomeTabScreen';

/*
  to do:
    - Phone Number verifications.
    - Password reset functionality.
    - IOS testing.
      o ios linking is not done yet. (need Xcode)
    - transition between screens on figma is cool tbh...
    - add email verification screen for password reset: conditional rendering between email and phone number verification
    - check the files for unnecessary lines
    - May use useContext() later for passing params to routes (like the current user)
    - react-firebase-hooks but already using many libraries so will come back to Jonas for that later -hopefully-
    
  issues:
    - Couldn't get the svg for the password icon as I can't export the icon without the 'rectangle' layer.
    - KeyboardAvoidingView not working
    - Verification cell styling is not really that accurate
    - Fontfamily doesn't work
*/

const App = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!user && (
            <>
              <Stack.Screen name="Signin" component={SignInScreen} />
              <Stack.Screen name="Signup" component={SignUpScreen} />
              <Stack.Screen name="Reset" component={ResetPasswordScreen} />
              <Stack.Screen
                name="CreateNewPassword"
                component={NewPasswordScreen}
              />
            </>
          )}
          {user && (
            <>
              {!user.phoneNumber && (
                <Stack.Screen
                  name="VerificationScreen"
                  component={VerificationScreen}
                />
              )}
              <Stack.Screen
                name="SubscriptionPlanScreen"
                component={SubscriptionPlanScreen}
              />
              <Stack.Screen
                name="HomeTabScreen"
                component={HomeTabScreen}
                initialParams={{name: auth().currentUser?.displayName}}
              />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
