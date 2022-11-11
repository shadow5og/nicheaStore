import { Component, OnInit, Input } from '@angular/core';
import Category from 'src/app/models/category-model';

@Component({
  selector: 'app-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Input() productCategories: Category[];

  constructor() {}

  ngOnInit(): void {}
}
