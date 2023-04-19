import {View, Text} from 'react-native';
import React from 'react';
import BronzeSubscriptionPlan from '../../components/Subscription/BronzeSubscriptionPlan';
import SilverSubscriptionPlan from '../../components/Subscription/SilverSubscriptionPlan';
import GoldSubscriptionPlan from '../../components/Subscription/GoldSubscriptionPlan';

/* 
  issues:  
    - features list 'haunted location not shifted'
    - flatlist condition rendering is weird so i had to render each component on its own...
    - replaced list with normal, totally static rendering.
    - Couldn't do the same exact colors on figma so used a color picker and did it as close as I could.
*/

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
