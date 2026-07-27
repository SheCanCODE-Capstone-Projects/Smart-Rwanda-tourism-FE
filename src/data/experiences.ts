import { Experience } from '@/types';
import { cloudinaryImages } from './cloudinaryImages';

export const experiences: Experience[] = [
  {
    id: 'gorilla-trekking',
    eyebrow: 'Adventure',
    title: 'Mountain Gorilla Trekking',
    desc: 'Trek through the misty slopes of Volcanoes National Park to spend an hour with a mountain gorilla family.',
    image: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'lake-kivu-cruise',
    eyebrow: 'Leisure',
    title: 'Lake Kivu Boat Cruise',
    desc: 'Sail across calm waters ringed by terraced coffee farms and fishing villages at golden hour.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sunrise%20over%20Lake%20Kivu.jpg?width=1200',
  },
  {
    id: 'canopy-walk',
    eyebrow: 'Nature',
    title: 'Nyungwe Canopy Walk',
    desc: "Cross a suspension walkway 60 metres above one of Africa's oldest rainforests.",
    image: cloudinaryImages.experiences.canopyWalk,
  },
  {
    id: 'culture-dance',
    eyebrow: 'Culture',
    title: 'Traditional Amaraba Dance',
    desc: "Experience Rwanda's storied dance traditions and neighbourhood life in Nyamirambo.",
    image: 'https://images.unsplash.com/photo-1516900557549-41557d405adf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'akagera-safari',
    eyebrow: 'Wildlife',
    title: 'Akagera Safari Drive',
    desc: 'Track lions, elephants and giraffe across Rwanda\u2019s savannah on a guided game drive.',
    image: cloudinaryImages.experiences.akageraSafari,
  },
  {
    id: 'coffee-farm-tour',
    eyebrow: 'Leisure',
    title: 'Coffee Farm Tour',
    desc: 'Walk the terraces of a Western Province coffee farm and taste beans fresh from the roast.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/NP%20Rwanda%20Coffee6%20(6283320845).jpg?width=1200',
  },
  {
    id: 'kings-palace-museum',
    eyebrow: 'Heritage',
    title: "King's Palace Museum, Nyanza",
    desc: 'Step into royal Rwanda with the restored palace grounds and its famous long-horned Inyambo cattle.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/King%27s%20Palace%20Museum%202022-3.jpg?width=1200',
  },
  {
    id: 'kimironko-market',
    eyebrow: 'Culture',
    title: 'Kimironko Market Walk',
    desc: 'Wander stalls of fabric, produce and crafts through Kigali\u2019s largest local market.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kimironko%20Market%2C%20Kigali.jpg?width=1200',
  },
];
