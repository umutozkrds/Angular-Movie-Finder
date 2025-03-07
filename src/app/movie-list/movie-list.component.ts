import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  providers: [MoviesService, FavoriteService]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  constructor(
    private moviesService: MoviesService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.favoriteService.checkFavorites(this.movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        // Handle the error appropriately in your UI
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
  }

  toggleFavorite(movie: Movie): void {
    movie.isFavorite = !movie.isFavorite;  // Favori durumunu tersine çevir

    // Favoriyi kaydet (localStorage veya backend kullanarak)
    this.favoriteService.saveFavorite(movie);
  }
  
}
