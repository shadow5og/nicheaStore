import { Component, OnInit, Input } from '@angular/core';
import { ParamMap } from '@angular/router';
import resolveLink from 'src/app/utils/utils';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() pagination: [number[], [boolean, boolean]];
  @Input() category: string;
  @Input() params: ParamMap;

  constructor() {}

  toString(page: number): string {
    return page.toString();
  }
  
  resolveLink(page:number):string{
    return resolveLink(page, this.category);
  }

  ngOnInit(): void {}
}