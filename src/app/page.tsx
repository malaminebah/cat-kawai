"use client"

import React, { useEffect, useState } from 'react'
import { CatBattle } from '@/component/CatBattle'
import { fetchCats } from './api/catApi';
import "../styles/RankingPage.css"
export type Cat = {
  id: string;
  url: string;
}

export const getRandomPair = (catArray: Cat[]): [Cat, Cat] | null => {
  if (!catArray || catArray.length < 2) return null;
  
  const image1 = Math.floor(Math.random() * catArray.length);
  let image2 = Math.floor(Math.random() * catArray.length);
  
  while (image1 === image2) {
    image2 = Math.floor(Math.random() * catArray.length);
  }
  
  return [catArray[image1], catArray[image2]];
};

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [scores, setScores] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const savedScores = localStorage.getItem('catScores');
      return savedScores ? JSON.parse(savedScores) : {};
    }
    return {};
  });
  const [currentPair, setCurrentPair] = useState<[Cat, Cat] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

 

  const handleVote = (winnerId: string) => {
    setScores(prev => {
      const newScores = {
        ...prev,
        [winnerId]: (prev[winnerId] || 0) + 1
      };
      localStorage.setItem('catScores', JSON.stringify(newScores));
      return newScores;
    });

    if (cats.length >= 2) {
      const newPair = getRandomPair(cats);
      setCurrentPair(newPair);
    }
  };

  useEffect(() => {
    const loadCats = async () => {
      try {
        const data = await fetchCats();
        setCats(data);
        const initialPair = getRandomPair(data);
        setCurrentPair(initialPair);
        setLoading(false);
      } catch (error) {
        console.log(error);
        
        setError("Impossible de charger les données.");
        setLoading(false);
      }
    };

    loadCats();
  }, []);

  return (
    <CatBattle 
      currentPair={currentPair}
      scores={scores}
      loading={loading}
      error={error}
      onVote={handleVote}
      onRetry={() => window.location.reload()}
    />
  );
}
