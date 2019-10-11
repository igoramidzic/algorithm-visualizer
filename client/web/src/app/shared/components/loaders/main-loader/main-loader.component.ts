import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-loader',
  templateUrl: './main-loader.component.html',
  styleUrls: ['./main-loader.component.scss']
})
export class MainLoaderComponent implements OnInit {

  @Input() color: string;
  items: string[] = [
    'sk-circle1',
    'sk-circle2',
    'sk-circle3',
    'sk-circle4',
    'sk-circle5',
    'sk-circle6',
    'sk-circle7',
    'sk-circle8',
    'sk-circle9',
    'sk-circle10',
    'sk-circle11',
    'sk-circle12'
  ]

  constructor() { }

  ngOnInit() {
  }

}
