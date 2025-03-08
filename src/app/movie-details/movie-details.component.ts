import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieDetail } from '../models/movie-detail.model';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie.model';
import { WatchlistService } from '../services/watchlist.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
  providers: [MoviesService, FavoriteService, WatchlistService]
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetail | undefined;
  constructor(private route: ActivatedRoute,
    private moviesService: MoviesService,
    private favoriteService: FavoriteService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.moviesService.getMovieById(params['id']).subscribe(movie => {
        try {
          this.movie = movie
          this.favoriteService.checkFavorites(movie as any);
          this.watchlistService.checkWatchlist(movie as any);
        } catch (error) { 
          console.error('Error fetching movie details:', error);
        }
      });
    });
  }
  toggleFavorite(movie: MovieDetail): void {
    (movie as any).isFavorite = !(movie as any).isFavorite;
    this.favoriteService.saveFavorite(movie as any);
  }
  toggleWatchlist(movie: MovieDetail): void {
    (movie as any).isWatchlist = !(movie as any).isWatchlist;
    this.watchlistService.saveWatchlist(movie as any);
  }


}
