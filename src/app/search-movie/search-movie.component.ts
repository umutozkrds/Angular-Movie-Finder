import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-movie',
  standalone: false,
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css',
  providers: [MoviesService]
})
export class SearchMovieComponent implements OnInit {
  handleImageError($event: ErrorEvent) {
  throw new Error('Method not implemented.');
  }
  searchQuery: string = '';
  movies: Movie[] = [];
  private searchSubject = new Subject<string>();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300), // ⏳ Kullanıcı yazmayı bitirdikten 300ms sonra çalışır
      distinctUntilChanged(), // 🔄 Aynı sorguyu tekrar yazarsa çalışmaz
      switchMap(query => this.moviesService.searchMovies(query)) // 🎯 API isteği
    ).subscribe(
      movies => {
          this.movies = movies;
      },
      error => {
          console.error('Error fetching movies:', error);
      }
  );
  }
  
  onSearch(query: string) {
    this.searchSubject.next(query);  // 🔥 Kullanıcı her yazdığında yeni sorgu atılıyor
  }

  searchMovies() {
    if (!this.searchQuery.trim()) return;

    this.moviesService.searchMovies(this.searchQuery).subscribe(
        movies => {
            this.movies = movies;
        },
        error => {
            console.error('Error fetching movies:', error);
        }
    );
}
}