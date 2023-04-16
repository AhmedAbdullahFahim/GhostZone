import {View, Text} from 'react-native';
import React from 'react';
import SubscriptionPlan from '../../components/Subscription/BronzeSubscriptionPlan';
import BronzeSubscriptionPlan from '../../components/Subscription/BronzeSubscriptionPlan';
import SilverSubscriptionPlan from '../../components/Subscription/SilverSubscriptionPlan';
import GoldSubscriptionPlan from '../../components/Subscription/GoldSubscriptionPlan';

/* 
  issues:  
    - Bronze subscription plan: tried overflow-visible, bottom value instead of -top, tried z-index, nothing, added more margin to header.
    - features list 'haunted location'
    - cant do gradient colors conditionally so I have to render the whole component conditionally???
    - flatlist condition rendering is weird overall
    - replaced list with normal, totally static rendering.
    - Couldn't do the same exact colors on figma so used a color picker and did it as close as I could.
*/

const plans = [
  {
    id: 1,
    type: 'Bronze',
    features: ['Basic features', '3 devices'],
    price: '69kr',
  },
  {
    id: 2,
    type: 'Silver',
    features: [
      'BRONZE',
      'Send tips for haunted locations',
      'Publish ghost stories',
    ],
    price: '99kr',
  },
  {
    id: 3,
    type: 'Gold',
    features: ['BRONZE+SILVER', 'Verified account', `Create "squads"`],
    price: '129kr',
  },
];

const SubscriptionPlanScreen = () => {
  return (
    <View className="flex-1 bg-[#2A2E30] px-7 pt-10">
      <Text className="font-bold text-2xl text-white mb-8">
        Subscription Plans
      </Text>
      <BronzeSubscriptionPlan />
      <SilverSubscriptionPlan />
      <GoldSubscriptionPlan />
    </View>
  );
};

export default SubscriptionPlanScreen;
