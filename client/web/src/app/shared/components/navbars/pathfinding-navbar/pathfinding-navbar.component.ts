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
  @Output() clearWallsEmitter: EventEmitter<boolean> = new EventEmitter();
  playing: boolean;

  constructor(public algorithmService: AlgorithmService) { }

  ngOnInit() {
  }

  play(): void {
    this.playing = true;
  }

  pause(): void {
    this.playing = false;
  }

  clearWalls(): void {
    this.clearWallsEmitter.emit(true);
  }

  get algorithmName(): string {
    return this.algorithmService.getPathfindingAlgorithmName(this.algorithm);
  }
}
