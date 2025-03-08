import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { FavoriteService } from '../services/favorite.service';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  providers: [MoviesService, FavoriteService, WatchlistService]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private moviesService: MoviesService,
    public favoriteService: FavoriteService,
    public watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.error = null;

    this.moviesService.getMovies().subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
        this.isLoading = false;
        this.favoriteService.checkFavorites(this.movies);
        this.watchlistService.checkWatchlist(this.movies);
      },
      error: (error: any) => {
        this.error = 'Failed to load movies. Please try again.';
        this.isLoading = false;
        console.error('Error loading movies:', error);
      }
    });
  }

  retryLoading(): void {
    this.loadMovies();
  }

  handleImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
  }

  toggleFavorite(movie: Movie): void {
    movie.isFavorite = !movie.isFavorite;
    this.favoriteService.saveFavorite(movie);
  }

  toggleWatchlist(movie: Movie): void {
    movie.isWatchlist = !movie.isWatchlist;
    this.watchlistService.saveWatchlist(movie);
  }

  isFavorite(imdbID: string): boolean {
    return this.favoriteService.getFavorites().some(movie => movie.imdbID === imdbID);
  }

  isWatchlist(imdbID: string): boolean {
    return this.watchlistService.getWatchlist().some(movie => movie.imdbID === imdbID);
  }
}
