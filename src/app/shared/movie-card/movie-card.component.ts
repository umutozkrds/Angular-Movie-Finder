import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnInit {
handleImageError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
  @Input() movie!: Movie;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggle = new EventEmitter<string>();
  @Input() isWatchlist: boolean = false;
  @Output() watchlistToggle = new EventEmitter<string>();

  ngOnInit(): void {
    
  }
  
  toggleFavorite() {
    this.favoriteToggle.emit(this.movie.imdbID);
  }

  toggleWatchlist() {
    this.watchlistToggle.emit(this.movie.imdbID);
  }
}
