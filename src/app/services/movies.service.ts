import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable , BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable()
export class MoviesService {

  AUTH_SERVER: string = 'https://cotufa-back.herokuapp.com';

  private jwt: string;

  constructor(private httpClient: HttpClient) { }
  

  getMovies(genre?: string,title?: string, page?: number, size?: number, sort?: string){


    let params = new HttpParams();

    params = genre ? params.append('genre', genre): params;
    params = title ? params.append('title', title): params;
    params = page ? params.append('page', page + ''): params;
    params = size ? params.append('size', size + ''): params;
    params = sort ? params.append('sort', sort): params;
     

    return this.httpClient.get<any>( `${this.AUTH_SERVER}/movies` , { params: params });
  }

  getMoviebyId(id){
    return this.httpClient.get<any>( `${this.AUTH_SERVER}/movies/${id}`);
  }

  removeMovie(id){
    return this.httpClient.delete<any>( `${this.AUTH_SERVER}/movies/${id}`);
  }


  getMoviesGenre(){
    return this.httpClient.get<any>( `${this.AUTH_SERVER}/movies/genres` );
  }

  getExtraMovie(title){

    let params = new HttpParams();

    params = title ? params.append('query', title): params;

    return this.httpClient.get<any>( 'https://api.themoviedb.org/3/search/movie?api_key=e29e16bc5ac5c58cbcc791220b704423&language=en-US&page=1' , { params: params });
  }

  getSuggestedGenres(){
    return this.httpClient.get<any>( ' https://api.themoviedb.org/3/genre/movie/list?api_key=e29e16bc5ac5c58cbcc791220b704423&language=en-US' );
  }

  editMovie(movie: Movie, id): Observable<Movie> {
    return this.httpClient.patch<Movie>(`${this.AUTH_SERVER}/movies/${id}`, movie)
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(`${this.AUTH_SERVER}/movies`, movie)
  }






}
