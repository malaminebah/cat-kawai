"use client"

import React, { useEffect, useState } from 'react'
import '../styles/CatBattle.css'

type Cat = {
  id: string;
  url: string;
}

export const CatBattle = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [currentPair, setCurrentPair] = useState<[Cat, Cat] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch('https://data.latelier.co/cats.json');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        if (Array.isArray(data.images)) {
          setCats(data.images);
          const initialPair = getRandomPair(data.images);
          setCurrentPair(initialPair);
        } else {
          throw new Error('Format de données incorrect');
        }
        setLoading(false);
      } catch (error) {
        console.log('Erreur détaillée:', error);
        setError("Impossible de charger les données. L'API semble inaccessible.");
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  const getRandomPair = (catArray: Cat[]): [Cat, Cat] | null => {
    if (!catArray || catArray.length < 2) return null;
    
    const image1 = Math.floor(Math.random() * catArray.length);
    let image2 = Math.floor(Math.random() * catArray.length);
    
    while (image1 === image2) {
      image2 = Math.floor(Math.random() * catArray.length);
    }
    
    return [catArray[image1], catArray[image2]];
  };

  const handleVote = (winnerId: string) => {
    console.log('Vote pour:', winnerId);
    
    setScores(prev => {
      const newScores = {
        ...prev,
        [winnerId]: (prev[winnerId] || 0) + 1
      };
      console.log('Nouveaux scores:', newScores);
      return newScores;
    });

    if (cats.length >= 2) {
      const newPair = getRandomPair(cats);
      console.log('Nouvelle paire:', newPair);
      setCurrentPair(newPair);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Chargement des petits chats... 🐱</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Erreur de connexion</div>
        <div>{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!currentPair) {
    return (
      <div className="error-container">
        Pas assez de chats disponibles pour la bataille !
      </div>
    );
  }

  return (
    <div className="cat-battle-container">
      <h1 className="cat-battle-title">Chat Battle</h1>
      <div className="cats-container">
        {currentPair && currentPair.map((cat) => (
          <div 
            key={cat.id} 
            className="cat-card"
            onClick={() => {
              console.log('Card clicked');
              handleVote(cat.id);
            }}
          >
            <div className="cat-image-container">
              <img 
                src={cat.url} 
                alt="Chat"
                className="cat-image"
              />
              <div className="vote-overlay">
                <span className="vote-text">Voter pour moi !</span>
              </div>
            </div>
            <div className="score-container">
              <p className="score-text">Score: {scores[cat.id] || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

