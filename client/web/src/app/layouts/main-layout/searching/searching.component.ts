import { Component, OnInit } from '@angular/core';
import { SearchingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent implements OnInit {

  algorithm: SearchingAlgorithm;
  SearchingAlgorithm = SearchingAlgorithm;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.setAlgorithm(params.algorithm);
    })
  }

  setAlgorithm(algorithmName: string): void {
    switch (algorithmName) {
      case 'astar':
        this.algorithm = SearchingAlgorithm.Astar;
        break;
      case 'bfs':
        this.algorithm = SearchingAlgorithm.BFS;
        break;
      case 'dfs':
        this.algorithm = SearchingAlgorithm.DFS;
        break;
      case 'dijkstras':
        this.algorithm = SearchingAlgorithm.Dijkstras;
        break;
      default:
        this.algorithm = null;
        this.router.navigate(['/'])
        break;
    }
  }

}
