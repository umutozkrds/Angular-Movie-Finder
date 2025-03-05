import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieDetail } from '../models/movie-detail.model';
import { ActivatedRoute } from '@angular/router';

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
          console.log(this.movie);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      });
    });
  }
}
