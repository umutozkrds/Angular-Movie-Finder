import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { FavoriteService } from '../services/favorite.service';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
  providers: [FavoriteService, WatchlistService]
})
export class FavoriteComponent implements OnInit {
  handleImageError($event: ErrorEvent) {
    throw new Error('Method not implemented.');
  }
  movies: Movie[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.movies = this.favoriteService.getFavorites();
    this.favoriteService.checkFavorites(this.movies);
    this.watchlistService.checkWatchlist(this.movies);
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
