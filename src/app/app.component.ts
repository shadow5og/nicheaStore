import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nicheaStore';
  stick: boolean;

  constructor() {

  }
  
  sticky(isSticky: boolean): void{
    this.stick = isSticky;
  }
}
