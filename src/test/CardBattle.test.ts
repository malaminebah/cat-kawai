// catBattle.test.tsx

import { getRandomPair } from '@/app/utils/getRandomPair';
import { Cat } from '@/types/type';


describe('getRandomPair function', () => {
 

  
  const testCats: Cat[] = [
    { id: '1', url: 'cat1.jpg' },
    { id: '2', url: 'cat2.jpg' },
    { id: '3', url: 'cat3.jpg' }
  ];

  test('should return null for empty array', () => {
    const result = getRandomPair([]);
    expect(result).toBeNull();
  });

  test('should return null for array with one cat', () => {
    const result = getRandomPair([testCats[0]]);
    expect(result).toBeNull();
  });

  test('should return two different cats', () => {
    const result = getRandomPair(testCats);
    
    
    expect(result).not.toBeNull();
    
    if (result) { 
      
      expect(result.length).toBe(2);
      
     
      expect(result[0].id).not.toBe(result[1].id);
      
    
      expect(testCats).toContainEqual(result[0]);
      expect(testCats).toContainEqual(result[1]);
    }
  });
});