import Image1 from '../assets/garden.jpg';
import Image2 from '../assets/marguerite.jpg';
import Image3 from '../assets/pink.jpg';
import Image4 from '../assets/rose.jpg';
import Image5 from '../assets/rose2.jpg';

export const getAccountThumbnailSource = (id: number) => {
  if (id === -1) {
    return Image1;
  }

  const arr = [Image1, Image2, Image3, Image4, Image5];
  const idx = id % arr.length;

  return arr[idx];
};
