import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';

import SignInScreen from './src/screens/stack/SignInScreen';
import SignUpScreen from './src/screens/stack/SignUpScreen';
// import ResetPassword from './src/screens/stack/ResetPasswordScreen';
// import NewPasswordScreen from './src/screens/stack/NewPasswordScreen';
import VerificationScreen from './src/screens/stack/VerificationScreen';
import SubscriptionPlanScreen from './src/screens/stack/SubscriptionPlanScreen';
import HomeTabScreen from './src/screens/tab/HomeTabScreen';

/*
  to do:
    - Password reset functionality.
    - Input fields verification.
    - IOS testing.
      o ios linking is not done yet. (need Xcode)
    - transition between screens on ssss ssdasd figma is cool tbh...
    - add email verification screen for password reset: conditional rendering between email and phone number verification
    - loading component in the verification screen until the state changes to true.
    - resend code
    
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

  console.log(user);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
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
                // I can either do that or just call the auth().currentUser there.
                initialParams={{name: auth().currentUser?.displayName}}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </>
          )}

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
