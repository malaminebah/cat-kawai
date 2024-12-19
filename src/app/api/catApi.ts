export type Cat = {
    id: string;
    url: string;
}

export type RankedCat = Cat & {
    score: number;
    rank: number;
}

const API_URL = 'https://data.latelier.co/cats.json';

export async function fetchCats(): Promise<Cat[]> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        return data.images;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

