import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PathfindingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { AlgorithmService } from 'src/app/services/algorithm/algorithm.service';

@Component({
  selector: 'app-pathfinding-navbar',
  templateUrl: './pathfinding-navbar.component.html',
  styleUrls: ['./pathfinding-navbar.component.scss']
})
export class PathfindingNavbarComponent implements OnInit {

  @Input() algorithm: PathfindingAlgorithm;
  @Input() isPlaying: boolean;
  @Input() settings: { visualizeSpeed: number };
  @Output() clearWallsEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() resetGridEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() visualizeEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() randomWallsEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(public algorithmService: AlgorithmService) { }

  ngOnInit() {
  }

  visualize(): void {
    this.visualizeEmitter.emit(true);
  }

  clearWalls(): void {
    this.clearWallsEmitter.emit(true);
  }

  resetGrid(): void {
    this.resetGridEmitter.emit(true);
  }

  addRandomWalls(): void {
    this.randomWallsEmitter.emit(true);
  }

  get algorithmName(): string {
    return this.algorithmService.getPathfindingAlgorithmName(this.algorithm);
  }
}
