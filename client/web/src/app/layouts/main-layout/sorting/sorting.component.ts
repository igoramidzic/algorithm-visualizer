import { Component, OnInit } from '@angular/core';
import { SortingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  algorithm: SortingAlgorithm;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
    })
  }

}
