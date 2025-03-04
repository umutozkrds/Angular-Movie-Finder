import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
@Injectable()
export class MoviesService {
    private apiUrl = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
    private httpHeaders = new HttpHeaders({
        'x-rapidapi-key': 'cdd16c0f14msh3cdc885280fb6bdp105080jsn16ee5ea07339',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    })
    constructor(
        private http: HttpClient
    ) { }

    getMovies(): Observable<Movie[]> {
        return this.http.get<any>(this.apiUrl, { headers: this.httpHeaders }).pipe(
            map(response => {
                if (!response) {
                    return [];
                }

                return response.map((movie: any) => ({
                    Title: movie.originalTitle,
                    Year: movie.startYear,
                    imdb: movie.averageRating,
                    Type: movie.type,
                    MovieLink: movie.url || `https://www.imdb.com/title/${movie.id}`,
                    img: movie.primaryImage,
                    Genres: movie.genres?.[0] || 'N/A'
                }));
            })
        );
    }
}

// averageRating, originalTitle,primaryImage, startYear, url, type, genres
