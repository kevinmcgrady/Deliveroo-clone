import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'qwoxusny',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
});

const builder = ImageUrlBuilder(client);
export const urlFor = (sourse) => builder.image(sourse);

export default client;
