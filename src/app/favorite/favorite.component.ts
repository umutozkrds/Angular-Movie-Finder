import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
  providers: [MoviesService]
})
export class FavoriteComponent implements OnInit {
  handleImageError($event: ErrorEvent) {
    throw new Error('Method not implemented.');
  }
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.movies = this.moviesService.getFavorites();
    this.checkFavorites();
  }

  toggleFavorite(movie: Movie): void {
    movie.isFavorite = !movie.isFavorite;  // Favori durumunu tersine çevir

    // Favoriyi kaydet (localStorage veya backend kullanarak)
    this.saveFavorite(movie);
  }

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
      // Remove the movie from the component's movies array when unfavorited
      const movieIndex = this.movies.findIndex(m => m.imdbID === movie.imdbID);
      if (movieIndex !== -1) {
        this.movies.splice(movieIndex, 1);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  checkFavorites(): void {
    // Yerel depolamadan favorileri kontrol et ve filmlerle eşleştir
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.movies.forEach(movie => {
      movie.isFavorite = favorites.some((fav: Movie) => fav.imdbID === movie.imdbID);  // Favori olanları işaretle
    });
  }
}
