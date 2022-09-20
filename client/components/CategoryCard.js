import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { urlFor } from '../sanity';

export const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className='mr-2 relative'>
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className='h-20 w-20 rounded'
      />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
