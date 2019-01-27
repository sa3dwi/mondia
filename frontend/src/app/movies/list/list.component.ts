import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Movie } from '../../_models';
import { MoviesService } from '../../_services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies: Movie[];
  displayedColumns = ['title', 'rate', 'actions'];

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.moviesService
      .getMovies()
      .subscribe((data: Movie[]) => {
        this.movies = data;
      });
  }

  // navigate to edit page
  editMovie(id: String) {
    this.router.navigate([`/edit/${id}`]);
  }

  // remove movie item
  deleteMovie(id: String) {
    this.moviesService.deleteMovie(id).subscribe(() => {
      this.fetchMovies();
    });
  }

}
