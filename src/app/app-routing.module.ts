import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'top-250-movies', component: MovieListComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'search-movie', component: SearchMovieComponent },
  { path: 'my-favorites', component: FavoriteComponent },
  { path: 'my-watchlist', component: WatchlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
