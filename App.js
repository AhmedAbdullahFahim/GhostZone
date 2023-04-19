import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';

import SignInScreen from './screens/stack/SignInScreen';
import SignUpScreen from './screens/stack/SignUpScreen';
import ResetPassword from './screens/stack/ResetPasswordScreen';
import NewPasswordScreen from './screens/stack/NewPasswordScreen';
import VerificationScreen from './screens/stack/VerificationScreen';
import SubscriptionPlanScreen from './screens/stack/SubscriptionPlanScreen';
import HomeTabScreen from './screens/tab/HomeTabScreen';

/*
  to do:
    - Password reset functionality.
    - Input fields verification.
    - IOS testing.
      o ios linking is not done yet. (need Xcode)
    - transition between screens on figma is cool tbh...
    - add email verification screen for password reset: conditional rendering between email and phone number verification
    
  issues:
    - Couldn't get the svg for the password icon as I can't export the icon without the 'rectangle' layer.
    - KeyboardAvoidingView not working
    - Fontfamily doesn't work
*/

const App = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState();
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
              <Stack.Screen
                name="Signin"
                component={SignInScreen}
                options={{
                  animation: 'fade_from_bottom',
                  animationDuration: 300,
                }}
              />
              <Stack.Screen
                name="Signup"
                component={SignUpScreen}
                options={{
                  animation: 'slide_from_right',
                  animationDuration: 300,
                }}
              />
            </>
          )}
          {user && !user.phoneNumber && (
            <>
              <Stack.Screen
                name="VerificationScreen"
                component={VerificationScreen}
                options={{
                  animation: 'slide_from_right',
                  animationDuration: 300,
                }}
              />
            </>
          )}
          <Stack.Screen
            name="SubscriptionPlanScreen"
            component={SubscriptionPlanScreen}
            options={{animation: 'fade_from_bottom', animationDuration: 300}}
          />
          <Stack.Screen
            name="HomeTabScreen"
            component={HomeTabScreen}
            options={{animation: 'fade_from_bottom', animationDuration: 300}}
            // I can either do that or just call the auth().currentUser there.
            initialParams={{name: auth().currentUser?.displayName}}
          />
          {/* 
          <Stack.Screen
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          name="CreateNewPassword"
          component={NewPasswordScreen}
        /> */}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
