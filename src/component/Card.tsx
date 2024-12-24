import { Cat } from "@/types/type";
import React from "react";

type CardProps = {
  cat: Cat;
  score: number;
  onVote: (id: string) => void;
};

export const Card = ({ cat, score, onVote }: CardProps) => {
  return (
    <div key={cat.id} className="cat-card" onClick={() => onVote(cat.id)}>
      <div className="cat-image-container">
        <img src={cat.url} alt="Chat" className="cat-image" />
        <div className="vote-overlay">
          <span className="vote-text">Voter pour moi !</span>
        </div>
      </div>
      <div className="score-container">
        <p className="score-text">Score: {score}</p>
      </div>
    </div>
  );
};
