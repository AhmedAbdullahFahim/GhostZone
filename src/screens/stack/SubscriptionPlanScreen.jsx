import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Bronze from '../../components/Subscription/Bronze';
import Silver from '../../components/Subscription/Silver';
import Gold from '../../components/Subscription/Gold';
import auth from '@react-native-firebase/auth';


/* 
  issues:  
    - features list 'haunted location not shifted'
    - flatlist
    - Radial Gradient

    ...
    - FIle naming: bronze, silver, gold.
    - src > components, screens.
    - typescript.
*/

const SubscriptionPlanScreen = () => {
  return (
    <View className="flex-1 bg-[#2A2E30] px-7 pt-10">
      <Text className="font-bold text-2xl text-white mb-8">
        Subscription Plans
      </Text>
      <Bronze />
      <Silver />
      <Gold />
      <Pressable
        onPress={() => {
          auth().signOut();
        }}>
        <Text>Sign out!</Text>
      </Pressable>
    </View>
  );
};

export default SubscriptionPlanScreen;
