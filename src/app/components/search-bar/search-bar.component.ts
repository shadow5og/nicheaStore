import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() hideSearch: boolean = false;
  @Output() btnClick = new EventEmitter();

  constructor() { }

  onClick(): void {
    this.btnClick.emit();
  }

  ngOnInit(): void {
  }

}
