import { Cat } from "@/types/type";

export const getRandomPair = (catArray: Cat[]): [Cat, Cat] | null => {
    if (!catArray || catArray.length < 2) return null;
    
    const image1 = Math.floor(Math.random() * catArray.length);
    let image2 = Math.floor(Math.random() * catArray.length);
    
    while (image1 === image2) {
      image2 = Math.floor(Math.random() * catArray.length);
    }
    
    return [catArray[image1], catArray[image2]];
  };