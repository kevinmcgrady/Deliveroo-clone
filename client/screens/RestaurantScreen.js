import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { DishRow } from '../components/DishRow';
import { BasketIcon } from '../components/BasketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import { clearBasket, selectBasketItems } from '../features/basketSlice';

const RestaurantScreen = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(clearBasket());
  }, []);

  return (
    <>
      <ScrollView>
        <View className='relative'>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className='w-full h-56 bg-gray-300 p-4'
          />
          <TouchableOpacity
            className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full shadow'
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color='#00CCBB' />
          </TouchableOpacity>
        </View>

        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon color='green' opacity={0.5} size={22} />
                <Text className='text-xs text-gray-500'>
                  <Text className='text-green-500'>{rating}</Text> . {genre}
                </Text>
                <View className='flex-row items-center space-x-1'>
                  <MapPinIcon color='gray' opacity={0.4} size={22} />
                  <Text className='text-xs text-gray-500'>
                    Nearby . {address}
                  </Text>
                </View>
              </View>
            </View>
            <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
          </View>
          <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
            <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
            <Text className='pl-2 flex-1 text-md font-bold'>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color='#00CCBB' />
          </TouchableOpacity>
        </View>
        <View className='pb-36'>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>

          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>

      {items.length > 0 && <BasketIcon />}
    </>
  );
};

export default RestaurantScreen;
