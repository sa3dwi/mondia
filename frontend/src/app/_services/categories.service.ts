import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // set api endpoint
  endpoint = `${environment.apiUrl}/categories`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // get all Categories list
  getCategories() {
    return this.http.get<any>(`${this.endpoint}/all`);
  }

  // get Category Object by provided ID
  getCategoryById(id: String) {
    return this.http.get<Object>(`${this.endpoint}/category/${id}`);
  }

  //
  saveCategory(categoryId: String, movie: any): Observable<any> {
    return this.http.post(`${this.endpoint}/save/${categoryId}`, movie)
      .pipe(
        tap(() => console.log(`new category added`)),
        catchError( this.handleError<any>('saveCategory') )
      );
  }

  //
  deleteCategory(id: String) {
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
