import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieDetail } from '../models/movie-detail.model';
import { response } from 'express';
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
                    imdbID: movie.id,
                    Title: movie.originalTitle,
                    Year: movie.startYear,
                    imdb: movie.averageRating,
                    Type: movie.type,
                    MovieLink: movie.url || `https://www.imdb.com/title/${movie.id}`,
                    img: movie.primaryImage || '',
                    Genres: movie.genres?.[0] || 'N/A'
                }));
            })
        );
    }

    getMovieById(id: string): Observable<MovieDetail> {
        const url = `https://imdb236.p.rapidapi.com/imdb/${id}`;
        return this.http.get<any>(url, { headers: this.httpHeaders }).pipe(
            map(movie => ({
                imdbID: movie.id,
                title: movie.primaryTitle,
                year: movie.startYear,
                imdbRating: movie.averageRating,
                type: movie.type,
                genres: movie.genres,
                actors: movie.cast?.slice(0, 3).map((actor: { fullName: string }) => actor.fullName) || [],
                director: movie.directors[0]["fullName"],
                description: movie.description,
                budget: movie.budget,
                img: movie.primaryImage || ''
            }))
        );
    }

    searchMovies(query: string): Observable<Movie[]> {
       return this.http.get<any>(`https://imdb236.p.rapidapi.com/imdb/autocomplete?query=${query}`, { headers: this.httpHeaders }).pipe(
        map(response => {
            if (!response) {
                return [];
            }

            return response.map((movie: any) => ({
                imdbID: movie.id,
                Title: movie.originalTitle,
                Year: movie.startYear,
                imdb: movie.averageRating,
                Type: movie.type,
                MovieLink: movie.url || `https://www.imdb.com/title/${movie.id}`,
                img: movie.primaryImage || '',
                Genres: movie.genres?.[0] || 'N/A'
                }));
            })
        );
    }

    

}

