import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { CategoryCard } from './CategoryCard';
import sanityClient from '../sanity';

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "category"]`)
      .then((categories) => setCategories(categories));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={category.image}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};
