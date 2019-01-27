import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Object;
  currentUser: Object;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    // get all movies
    this.moviesService.getMovies()
    .pipe(first()).subscribe(data => {
        this.movies = data;
      });

    // set currentUser to display logged in user info
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
