"use client"

import React from "react"
import "../styles/CatBattle.css"
import Link from "next/link"

type Cat = {
  id: string
  url: string
}

type CatBattleProps = {
  currentPair: [Cat, Cat] | null
  scores: Record<string, number>
  loading: boolean
  error: string | null
  onVote: (winnerId: string) => void
  onRetry: () => void
}

export const CatBattle = ({
  currentPair,
  scores,
  loading,
  error,
  onVote,
  onRetry,
}: CatBattleProps) => {
  if (loading) return <p>Chargement des chats...</p>
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={onRetry}>Réessayer</button>
      </div>
    )

  if (!currentPair) {
    return (
      <div className="error-container">
        Pas assez de chats disponibles pour la bataille !
      </div>
    )
  }

  return (
    <div className="cat-battle-container">
      <div className="header">
        <h1 className="cat-battle-title">Chat Battle</h1>
        <Link href="/ranking" className="ranking-link">
          Voir le classement 🏆
        </Link>
      </div>
      <div className="cats-container">
        {currentPair.map((cat) => (
          <div
            key={cat.id}
            className="cat-card"
            onClick={() => onVote(cat.id)}
          >
            <div className="cat-image-container">
              <img src={cat.url} alt="Chat" className="cat-image" />
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
  )
}

