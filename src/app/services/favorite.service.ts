import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.model";

@Injectable()
export class FavoriteService {
    saveFavorite(movie: Movie): void {
        // Favorileri yerel depolama veya backend'e kaydet
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (movie.isFavorite) {
          favorites.push(movie);
        } else {
          const index = favorites.findIndex((fav: Movie) => fav.imdbID === movie.imdbID);
          if (index !== -1) {
            favorites.splice(index, 1);
          }
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));  // Favorileri yerel depolama kaydet
    }

    checkFavorites(movies: Movie[]): void {
        // Yerel depolamadan favorileri kontrol et ve filmlerle eşleştir
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        movies.forEach(movie => {
          movie.isFavorite = favorites.some((fav: Movie) => fav.imdbID === movie.imdbID);  // Favori olanları işaretle
        });
      }

}

