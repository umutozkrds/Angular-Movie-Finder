import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { Movie } from '../models/movie.model';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
  providers: [WatchlistService, FavoriteService]
})
export class WatchlistComponent implements OnInit {
  movies: Movie[] = [];
  constructor(
    private watchlistService: WatchlistService,
    private favoriteService: FavoriteService
  )
  { }
  handleImageError($event: ErrorEvent) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.movies = this.watchlistService.getWatchlist();
    this.watchlistService.checkWatchlist(this.movies);
    this.favoriteService.checkFavorites(this.movies);
   }

  toggleWatchlist(movie: Movie): void {
    movie.isWatchlist = !movie.isWatchlist;  
    this.watchlistService.saveWatchlist(movie);
  }

  toggleFavorite(movie: Movie): void {
    movie.isFavorite = !movie.isFavorite;
    this.favoriteService.saveFavorite(movie);
  }

}
