import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

export const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        className='bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1'
        onPress={() => navigation.navigate('Basket')}
      >
        <Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
          {items.length}
        </Text>
        <Text className='flex-1 text-white font-extrabold text-lg text-center'>
          View Basket
        </Text>
        <Text className='text-lg text-white font-extrabold'>
          &pound;{basketTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
