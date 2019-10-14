import { Component, OnInit } from '@angular/core';
import { SortingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  algorithm: SortingAlgorithm;
  SortingAlgorithm = SortingAlgorithm;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.setAlgorithm(params.algorithm);
    })
  }

  setAlgorithm(algorithmName: string): void {
    switch (algorithmName) {
      case 'insertionsort':
        this.algorithm = SortingAlgorithm.InsertionSort;
        break;
      case 'mergesort':
        this.algorithm = SortingAlgorithm.MergeSort;
        break;
      case 'quicksort':
        this.algorithm = SortingAlgorithm.QuickSort;
        break;
      case 'selectionsort':
        this.algorithm = SortingAlgorithm.SelectionSort;
        break;
      default:
        this.algorithm = null;
        this.router.navigate(['/'])
        break;
    }
  }

  get algorithmName(): string {
    switch (this.algorithm) {
      case SortingAlgorithm.InsertionSort:
        return "Insertion Sort"
      case SortingAlgorithm.MergeSort:
        return "Merge Sort"
      case SortingAlgorithm.QuickSort:
        return "QuickSort"
      case SortingAlgorithm.SelectionSort:
        return "Selection Sort"
      default:
        this.algorithm = null;
        this.router.navigate(['/'])
        break;
    }
  }

}
