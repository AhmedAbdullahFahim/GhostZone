import {View, Text, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Plan from '../../components/subscription/Plan';

/* 
  issues:  
    - features list 'haunted location not shifted'
    - typescript.
*/

const plans = [
  {
    id: 0,
    type: 'Bronze',
    price: '69kr',
    features: ['Basic features', '3 devices'],
    radial: ['#C9A07870', 'transparent'],
    linear: ['#C9A078', '#8D6847'],
  },
  {
    id: 1,
    type: 'Silver',
    price: '99kr',
    features: [
      'BRONZE',
      'Send tips for haunted locations',
      'Publish ghost stories',
    ],
    radial: ['#C9C9C990', 'transparent'],
    linear: ['#C9C9C9', '#8F8F8F'],
  },
  {
    id: 2,
    type: 'Gold',
    price: '129kr',
    features: ['BRONZE+SILVER', 'Verified account', `Create "squads"`],
    radial: ['#9E814860', 'transparent'],
    linear: ['#E1D7C5', '#9E8148'],
  },
];

const SubscriptionPlanScreen = () => {
  return (
    <View className="flex-1 bg-[#2A2E30] px-7 pt-10">
      <Text className="font-bold text-2xl text-white mb-6">
        Subscription Plans
      </Text>
      <FlatList
        data={plans}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => <Plan item={item} index={index} />}
        contentContainerStyle={{paddingTop: 16}}
      />
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
