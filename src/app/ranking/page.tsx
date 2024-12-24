"use client";

import React, { useEffect, useState } from "react";
import { CatRanking } from "@/component/CatRanking";
import Link from "next/link";
import { fetchCats } from "../api/catApi";

type Cat = {
  id: string;
  url: string;
};

export default function RankingPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const catsData = await fetchCats();
        setCats(catsData);

        //scores du localStorage
        const savedScores = localStorage.getItem("catScores");
        if (savedScores) {
          setScores(JSON.parse(savedScores));
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur:", error);
        setError("Impossible de charger les données.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="ranking-page">
      <nav className="navigation">
        <Link href="/" className="back-button">
          ← Retour aux votes
        </Link>
        <h1 className="page-title">Top votes</h1>
      </nav>
      <CatRanking cats={cats} scores={scores} loading={loading} error={error} />
    </div>
  );
}
