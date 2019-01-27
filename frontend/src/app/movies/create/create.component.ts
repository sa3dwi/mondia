import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MoviesService, CategoriesService } from '../../_services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  categoryList: Object;

  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: '',
      rate: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      category: ['', [Validators.required]]
    });
  }

  //
  addMovie(id: string, title: String, description: String, rate: number, category: String) {
    const newMovie: any = {
      id: '',
      title: title,
      description: description,
      rate: rate
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

  ngOnInit() {
    // get category List
    this.categoriesService.getCategories()
      .pipe(
        map( data => this.categoryList = data))
        .subscribe();
  }
}
