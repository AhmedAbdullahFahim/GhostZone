import React from 'react';
import {useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import BlogScreen from './BlogScreen';
import LocationsScreen from './LocationsScreen';
import SettingsScreen from './SettingsScreen';
import Home from '../../assets/images/tab-navigator/home.svg';
import Blog from '../../assets/images/tab-navigator/blog.svg';
import Locations from '../../assets/images/tab-navigator/locations.svg';
import Settings from '../../assets/images/tab-navigator/settings.svg';
import HomeActive from '../../assets/images/tab-navigator/home-active.svg';

const Tab = createBottomTabNavigator();

/* 
  - Had to use a negative marginTop value for the tab bar as a workaround so it makes the background the normal screen instead of showing a white background.

  - If I implemented the icons from a certain library I wouldn't have had to use two icons for each state (focused or not), I would just change the colors. But I exported the svg icons from the design itself and used them here, don't know -yet- how to manage an svg icon color... 

  
*/

const HomeTabScreen = () => {
  const route = useRoute();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F8F8F8',
        tabBarStyle: {
          backgroundColor: '#3E4549',
          height: 74,
          borderRadius: 56,
          marginBottom: 20,
          paddingBottom: 15,
          paddingTop: 10,
          paddingHorizontal: 10,
          marginTop: -120,
          width: '93%',
          alignSelf: 'center',
          borderWidth: 0.6,
          borderColor: 'transparent',
          // I know it's not transparent but this is the closest to the design -to my own eyes-
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          lineHeight: 15,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({focused}) => (focused ? <HomeActive /> : <Home />),
        }}
        initialParams={{name: route.params.name}}
      />
      <Tab.Screen
        name="BlogScreen"
        component={BlogScreen}
        options={{
          tabBarLabel: 'BLOG',
          tabBarIcon: () => <Blog />,
        }}
      />
      <Tab.Screen
        name="LocationsScreen"
        component={LocationsScreen}
        options={{
          tabBarLabel: 'LOCATIONS',
          tabBarIcon: () => <Locations />,
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'SETTINGS',
          tabBarIcon: () => <Settings />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabScreen;
