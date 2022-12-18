import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  maps =
    'https://www.google.com/maps/embed/v1/place?key=' +
    environment.API_KEY +
    '&q=Blue+lakes+Estate,Pioneer+Road,Benoni';

  constructor() {}

  ngOnInit(): void {}
}
