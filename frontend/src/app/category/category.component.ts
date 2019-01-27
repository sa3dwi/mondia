import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../_services';

@Component({
  selector: 'app-list',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // declare cat variable
  category: Object;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // get all categories
    this.route.params.subscribe(routeParams => {
      this.categoriesService.getCategoryById(routeParams.id).subscribe(data => {
        this.category = data;
      });
    });
  }
}
