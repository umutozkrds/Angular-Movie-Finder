import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
  providers: [MoviesService, FavoriteService]
})
export class FavoriteComponent implements OnInit {
  handleImageError($event: ErrorEvent) {
    throw new Error('Method not implemented.');
  }
  movies: Movie[] = [];

  constructor(
    private moviesService: MoviesService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.movies = this.moviesService.getFavorites();
    this.favoriteService.checkFavorites(this.movies);
  }

  toggleFavorite(movie: Movie): void {
    movie.isFavorite = !movie.isFavorite;  // Favori durumunu tersine çevir
    // Favoriyi kaydet (localStorage veya backend kullanarak)
    this.favoriteService.saveFavorite(movie);
  }

 

  
}
