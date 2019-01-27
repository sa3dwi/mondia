import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: Object;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    // get all categories
    this.categoriesService.getCategories()
      .pipe(take(1))
      .subscribe(
          data => {
            this.categories = data;
          },
          error => {
            console.log(error);
          });
  }
}
