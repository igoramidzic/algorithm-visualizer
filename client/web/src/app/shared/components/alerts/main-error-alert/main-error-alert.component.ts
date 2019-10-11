import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-error-alert',
  templateUrl: './main-error-alert.component.html',
  styleUrls: ['./main-error-alert.component.scss']
})
export class MainErrorAlertComponent implements OnInit {

  @Input() errors: string[];

  constructor() { }

  ngOnInit() {
  }

}
