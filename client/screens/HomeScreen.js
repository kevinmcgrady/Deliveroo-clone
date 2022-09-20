import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { Categories } from '../components/Categories';
import { FeaturedRow } from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const isAndroid = Platform.OS === 'android' && 'pt-12';

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`,
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <SafeAreaView className='bg-white pb-2'>
      <View
        className={`flex-row items-center mx-4 space-x-2 mt-4 ${isAndroid}`}
      >
        <Image
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
        />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
          <Text className='font-bold text-xl'>
            Current Location <ChevronDownIcon size={20} color='#00CCBB' />
          </Text>
        </View>

        <UserIcon size={30} color='#00CCBB' />
      </View>

      <View className='flex-row space-x-2 pb-2 mx-4 items-center mt-2'>
        <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3 items-center'>
          <MagnifyingGlassIcon color='gray' size={20} />
          <TextInput
            keyboardType='default'
            placeholder='Restaurants and cuisines'
          />
        </View>
        <AdjustmentsVerticalIcon size={25} color='#00CCBB' />
      </View>
      <ScrollView className='bg-gray-100'>
        <View className='pb-48'>
          <Categories />
          {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              title={category.name}
              description={category.short_description}
              id={category._id}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
