import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieDetail } from '../models/movie-detail.model';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
  providers: [MoviesService]
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetail | undefined;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.moviesService.getMovieById(params['id']).subscribe(movie => {
        try {
          this.movie = movie
          this.checkFavorites(movie);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      });
    });
  }
  toggleFavorite(movie: MovieDetail): void {
    (movie as any).isFavorite = !(movie as any).isFavorite;
    this.saveFavorite(movie);
  }

  saveFavorite(movie: MovieDetail): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if ((movie as any).isFavorite) {
      favorites.push(movie);
    } else {
      const index = favorites.findIndex((fav: Movie) => fav.imdbID === movie.imdbID);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  checkFavorites(movie: MovieDetail): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    (movie as any).isFavorite = favorites.some((fav: Movie) => fav.imdbID === movie.imdbID);
  }
}
