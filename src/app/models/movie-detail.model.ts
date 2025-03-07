export interface MovieDetail {
    imdbID: string;
    title: string;
    year: number;
    imdbRating: number;
    type: string;
    genres: string[];
    budget: number;  // Film açıklaması
    actors: string[];
    director: string;
    description: string;
    img: string;
    isFavorite?: boolean;
}
