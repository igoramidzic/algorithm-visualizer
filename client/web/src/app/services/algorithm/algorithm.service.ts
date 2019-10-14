import { Injectable } from '@angular/core';
import { PathfindingAlgorithm } from 'src/app/core/models/algorithm/algorithm';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor() { }

  getPathfindingAlgorithmName(algorithm: PathfindingAlgorithm): string {
    switch (algorithm) {
      case PathfindingAlgorithm.Astar:
        return "A*"
      case PathfindingAlgorithm.BFS:
        return "Breadth First Search"
      case PathfindingAlgorithm.DFS:
        return "Depth First Search"
      case PathfindingAlgorithm.Dijkstras:
        return "Dijkstra's"
      default:
        return "Not Found";
    }
  }
}
