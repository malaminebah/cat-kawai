"use client"

import React from 'react'
import '../styles/CatRanking.css'
import { Cat } from '@/types/type';

type CatRankingProps = {
  cats: Cat[];
  scores: Record<string, number>;
  loading: boolean;
  error: string | null;
}

export const CatRanking = ({ cats, scores, loading, error }: CatRankingProps) => {
  if (loading) return <p>Chargement du classement...</p>;
  if (error) return <p>{error}</p>;

  const sortedCats = [...cats].sort((a, b) => {
    const scoreA = scores[a.id] || 0;
    const scoreB = scores[b.id] || 0;
    return scoreB - scoreA;
  });

  const topThree = sortedCats.slice(0, 3);
  const restOfCats = sortedCats.slice(3);

  return (
    <div className="ranking-container">
      <div className="podium-container">
        {topThree.map((cat, index) => (
          <div 
            key={cat.id} 
            className={`podium-position podium-${index + 1}`}
          >
            <div className="podium-image-container">
              <img 
                src={cat.url} 
                alt={`Chat #${index + 1}`} 
                className="podium-image"
              />
              <div className="podium-medal">
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
              </div>
            </div>
            <div className="podium-score">
              <span className="score-number">{scores[cat.id] || 0}</span>
              <span className="score-label">Point(s)</span>
            </div>
            <div className="podium-place">#{index + 1}</div>
          </div>
        ))}
      </div>

      <h2 className="ranking-subtitle">Classement</h2>
      <div className="ranking-grid">
        {restOfCats.map((cat, index) => (
          <div key={cat.id} className="ranking-card">
            <div className="ranking-position">#{index + 4}</div>
            <div className="ranking-image-container">
              <img 
                src={cat.url} 
                alt={`Chat #${index + 4}`} 
                className="ranking-image"
              />
            </div>
            <div className="ranking-score">
              <span className="score-number">{scores[cat.id] || 0}</span>
              <span className="score-label">points</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 