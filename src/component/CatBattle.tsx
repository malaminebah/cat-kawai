"use client";

import React from "react";
import "../styles/CatBattle.css";
import Link from "next/link";
import { Card } from "./Card";
import { Cat } from "@/types/type";

type CatBattleProps = {
  currentPair: [Cat, Cat] | null;
  scores: Record<string, number>;
  loading: boolean;
  error: string | null;
  onVote: (winnerId: string) => void;
  onRetry: () => void;
};

export const CatBattle = ({
  currentPair,
  scores,
  loading,
  error,
  onVote,
  onRetry,
}: CatBattleProps) => {
  if (loading) return <p>Chargement des chats...</p>;
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={onRetry}>Réessayer</button>
      </div>
    );

  if (!currentPair) {
    return (
      <div className="error-container">
        Pas assez de chats disponibles pour la bataille !
      </div>
    );
  }

  return (
    <div className="cat-battle-container">
      <div className="header">
        <h1 className="cat-battle-title">Bataille de chats</h1>
        <Link href="/ranking" className="ranking-link">
          Voir le classement 🏆
        </Link>
      </div>
      <div className="cats-container">
        {currentPair.map((cat) => (
          <Card
            key={cat.id}
            cat={cat}
            score={scores[cat.id] || 0}
            onVote={onVote}
          />
        ))}
      </div>
    </div>
  );
};
