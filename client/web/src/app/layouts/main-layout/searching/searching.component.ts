import { Component, OnInit } from '@angular/core';
import { SearchingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent implements OnInit {

  algorithm: SearchingAlgorithm;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
    })
  }

}
