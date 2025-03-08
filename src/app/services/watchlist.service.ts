import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.model";

@Injectable()
export class WatchlistService {
    saveWatchlist(movie: Movie): void {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        if (movie.isWatchlist) {
            watchlist.push(movie);
        } else {
            const index = watchlist.findIndex((fav: Movie) => fav.imdbID === movie.imdbID);
            if (index !== -1) {
                watchlist.splice(index, 1);
            }
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
    
    checkWatchlist(movies: Movie[]): void {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        movies.forEach(movie => {
            movie.isWatchlist = watchlist.some((fav: Movie) => fav.imdbID === movie.imdbID);
        });
    }

    getWatchlist(): Movie[] {
        return JSON.parse(localStorage.getItem('watchlist') || '[]');
    }

}