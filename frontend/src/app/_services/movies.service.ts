import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {

  // set api endpoint
  endpoint = `${environment.apiUrl}/movies`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // return all movies from API
  getMovies() {
    return this.http.get<any>(`${this.endpoint}/all`)
     .pipe(
      tap(() => console.log(`get all movie`)),
      catchError( error => of(`Bad Request: ${error}`))
    );
  }

  // return movie object with the provided ID
  getMovieById(id: String) {
    return this.http.get(`${this.endpoint}/movie/${id}`);
  }

  // used to create and update movie with provided category ID and movie
  saveMovie(categoryId: String, movie: any): Observable<any> {
    return this.http.post(`${this.endpoint}/save/${categoryId}`, movie )
      .pipe(
        tap(() => console.log(`save Movie done`)),
        catchError( this.handleError<any>('addMovie') )
      );
  }

  // remove movie from database with the provided ID
  deleteMovie(id: String) {
    return this.http.get(`${this.endpoint}/delete/${id}`);
  }

  //
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
