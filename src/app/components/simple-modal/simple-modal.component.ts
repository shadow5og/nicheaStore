import { Component, Input, OnInit } from '@angular/core';
import {
  NgbActiveModal,
  NgbAlertModule,
  NgbAlertConfig
} from '@ng-bootstrap/ng-bootstrap';
import Alert from 'src/app/models/alerts-model';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css'],
  providers: [NgbActiveModal, NgbAlertConfig, NgbAlertModule],
})
export class SimpleModalComponent implements OnInit {
  @Input() alert: Alert = {
    type: 'success',
    message: 'Hello world.',
  };
  

  constructor(public modal: NgbActiveModal, alertConfig: NgbAlertConfig) {
    alertConfig.type = this.alert.type;
    // config.windowClass = 'my-class';
  }

  close(): void {
    this.modal.close('Cross click');
    console.log(this.modal);
  }

  ngOnInit(): void {}
}
