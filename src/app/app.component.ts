import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nicheaStore';
  stick: boolean;
  subscription: Subscription;

  constructor() {}

  setSticky($event:boolean):void{
    this.stick = $event;
  }
}
