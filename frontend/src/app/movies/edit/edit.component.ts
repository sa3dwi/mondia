import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { MoviesService, CategoriesService } from '../../_services';
import { Movie } from '../../_models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: String;
  movie: any = {};
  updateForm: FormGroup;
  categoryList: object;

  //
  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: '',
      rate: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.moviesService.getMovieById(this.id).subscribe(res => {
        this.movie = res;
        this.updateForm.get('title').setValue(this.movie.title);
        this.updateForm.get('description').setValue(this.movie.description);
        this.updateForm.get('rate').setValue(this.movie.rate);
        this.updateForm.get('category').setValue(this.movie.category);
      });
    });
    this.categoriesService.getCategories()
      .pipe(
        map( data => this.categoryList = data))
        .subscribe();
  }


  //
  updateMovie( title: String, description: String, rate: number, category: String) {
    const newMovie: any = {
      id: this.id,
      title: title,
      description: description,
      rate: rate,
    };

    this.moviesService.saveMovie(category, newMovie).subscribe(
      res => {
        this.router.navigate(['/list']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
