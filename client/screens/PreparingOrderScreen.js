import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);
  }, []);

  return (
    <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center px-2'>
      <Animatable.Image
        source={require('../assets/delivery-man.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-72 w-full'
      />
      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg my-10 text-white font-bold text-center'
      >
        Waiting for {restaurant.title} to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color='white' />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
