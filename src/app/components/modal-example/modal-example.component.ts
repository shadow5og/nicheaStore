import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbAlertConfig,
  NgbAlert,
} from '@ng-bootstrap/ng-bootstrap';
import Alert from 'src/app/models/alerts-model';

@Component({
  selector: 'app-modal-example',
  providers: [NgbActiveModal, NgbModal, NgbAlert],
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.css'],
})
export class ModalExampleComponent implements OnInit, OnChanges {
  @Input() alert: Alert = {
    type: 'success',
    message: 'Hello World',
  };
  private closeResult: any;
  private timer: any;
  @ViewChild('content') content: TemplateRef<HTMLUnknownElement>;
  private timeout: any;
  @Input() TIMEOUT_PERIOD: number = 4000;

  constructor(
    public modal: NgbActiveModal,
    private alertConfig: NgbAlertConfig,
    private modalService: NgbModal
  ) {
    this.alertConfig.type = this.alert.type;
  }

  close() {
    this.modal.dismiss('Cross click');
    this.modalService.dismissAll('Cross click');
  }

  ngOnInit(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.close(), this.TIMEOUT_PERIOD);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.alertConfig.type = this.alert.type;
  }
}
