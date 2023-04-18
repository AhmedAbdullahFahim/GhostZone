import { Text, Pressable } from 'react-native'
import React from 'react'

const MainBtn = ({title, navigate, submit}) => {
  return (
    <Pressable onPress={() => submit()} className="h-14 bg-[#CCCCCC] w-full mt-6 justify-center items-center rounded-xl">
      <Text className="font-bold text-base text-[#2A2E30]">{title}</Text>
    </Pressable>
  );
}

export default MainBtn
