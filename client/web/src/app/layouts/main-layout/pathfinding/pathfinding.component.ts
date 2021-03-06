import { Component, OnInit, Input } from '@angular/core';
import { PathfindingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GridNode, NodeType } from 'src/app/core/models/pathfinding/node/node';
import { AlgorithmService } from 'src/app/services/algorithm/algorithm.service';
import { PathFindingSettings } from 'src/app/core/models/pathFindingSettings/pathFindingSettings';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.scss']
})
export class PathfindingComponent implements OnInit {

  algorithm: PathfindingAlgorithm;
  PathfindingAlgorithm = PathfindingAlgorithm;
  grid: GridNode[][];
  isReset: boolean = true;
  isPlaying: boolean;
  gridX: number = 40;
  gridY: number = 20;
  settings: PathFindingSettings = {
    visualizeSpeed: 10,
    minVisualizeSpeed: 0,
    maxVisualizeSpeed: 50
  }

  constructor(private route: ActivatedRoute, private router: Router,
    private algorithmService: AlgorithmService) { }

  ngOnInit() {
    this.createGrid();
    this.route.params.subscribe((params: Params) => {
      this.setAlgorithm(params.algorithm);
    })
  }

  setAlgorithm(algorithmName: string): void {
    switch (algorithmName) {
      case 'astar':
        this.algorithm = PathfindingAlgorithm.Astar;
        break;
      case 'bfs':
        this.algorithm = PathfindingAlgorithm.BFS;
        break;
      case 'dfs':
        this.algorithm = PathfindingAlgorithm.DFS;
        break;
      case 'dijkstras':
        this.algorithm = PathfindingAlgorithm.Dijkstras;
        break;
      default:
        this.algorithm = null;
        this.router.navigate(['/'])
        break;
    }
  }

  createGrid(): void {
    let gridSizes: { x: number, y: number } = this.calculateGridSize();
    this.grid = [];

    let node: GridNode;
    for (let y = 0; y < gridSizes.y; y++) {
      this.grid.push([]);
      for (let x = 0; x < gridSizes.x; x++) {
        node = this.createNode(x, y, this.determineNodeType(gridSizes, x, y));
        this.grid[y][x] = node;
      }
    }
  }

  resetGrid(): void {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        this.grid[y][x].isPath = false;
        this.grid[y][x].visited = false;
        this.grid[y][x].isVisited = false;
        this.grid[y][x].cameFromNode = null;
        this.grid[y][x].distanceTraveled = null;
        this.grid[y][x].estimatedDistanceFromEnd = null;
      }
    }
    this.isReset = true;
  }

  calculateGridSize(): { x: number, y: number } {
    return { x: this.gridX, y: this.gridY };
  }

  createNode(xcoord: number, ycoord: number, type: NodeType): GridNode {
    return { xcoord, ycoord, type, visited: false, isPath: false };
  }

  determineNodeType(gridSizes: { x: number, y: number }, x, y): NodeType {
    if (x == Math.floor(gridSizes.x / 4) && y == Math.floor(gridSizes.y / 2))
      return NodeType.Start;
    if (x == Math.ceil(gridSizes.x / 4) * 3 && y == Math.floor(gridSizes.y / 2))
      return NodeType.End;
    return NodeType.Default;
  }

  clearWalls(): void {
    this.grid.forEach(row => {
      row.forEach(node => {
        if (node.type == NodeType.Wall)
          node.type = NodeType.Default;
      })
    });
    this.runAlgorithmInstantly();
  }

  visualize(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
    this.runAlgorithm();
  }

  visualizeAlgorithm(visited: GridNode[], path: GridNode[]): void {
    if (visited.length == 0 || path.length == 0)
      this.isPlaying = false;

    let k = 0;
    for (let i = 0; i < visited.length; i++) {
      setTimeout(() => {
        visited[i].visited = true;
      }, this.settings.visualizeSpeed * i);
      k++;
    }

    for (let j = 0; j < path.length; j++) {
      setTimeout(() => {
        path[j].isPath = true;

        if (j == path.length - 1)
          this.isPlaying = false;
      }, this.settings.visualizeSpeed * (k + j) + 250);
    }
  }

  visualizeAlgorithmInstantly(visited: GridNode[], path: GridNode[]): void {
    for (let i = 0; i < visited.length; i++) {
      visited[i].visited = true;
    }

    for (let j = 0; j < path.length; j++) {
      path[j].isPath = true;
    }
  }

  runAlgorithm(): void {
    this.resetGrid();

    let algorithmResult: { visited: GridNode[], path: GridNode[] };

    switch (this.algorithm) {
      case PathfindingAlgorithm.Astar:
        algorithmResult = this.algorithmService.runAStarAlgorithm(this.grid);
        break;
      case PathfindingAlgorithm.BFS:
        algorithmResult = this.algorithmService.runBFSAlgorithm(this.grid);
        break;
      case PathfindingAlgorithm.DFS:
        algorithmResult = this.algorithmService.runDFSAlgorithm(this.grid);
        break;
      case PathfindingAlgorithm.Dijkstras:
        algorithmResult = this.algorithmService.runDijkstrasAlgorithm(this.grid);
        break;
      default:
        break;
    }

    this.visualizeAlgorithm(algorithmResult.visited, algorithmResult.path);
    this.isReset = false;
  }

  runAlgorithmInstantly(): void {
    if (this.isPlaying || this.isReset)
      return;

    this.resetGrid();

    let algorithmResult: { visited: GridNode[], path: GridNode[] };

    switch (this.algorithm) {
      case PathfindingAlgorithm.Astar:
        algorithmResult = this.algorithmService.runAStarAlgorithm(this.grid);
        break;
      case PathfindingAlgorithm.BFS:
        algorithmResult = this.algorithmService.runBFSAlgorithm(this.grid);
        break;
      case PathfindingAlgorithm.DFS:
        algorithmResult = this.algorithmService.runDFSAlgorithm(this.grid);
        break;
      case PathfindingAlgorithm.Dijkstras:
        algorithmResult = this.algorithmService.runDijkstrasAlgorithm(this.grid);
        break;
      default:
        break;
    }

    this.visualizeAlgorithmInstantly(algorithmResult.visited, algorithmResult.path);
    this.isReset = false;
  }

  addRandomWalls(): void {
    let algorithmResult: { visited: GridNode[], path: GridNode[] };

    let timesTried = 0;
    while (timesTried < 100) {
      // Clear the walls to start fresh
      this.clearWalls();

      for (let y = 0; y < this.grid.length; y++)
        for (let x = 0; x < this.grid[0].length; x++)
          if (this.grid[y][x].type == NodeType.Default) {
            let shouldBeWall = Math.random() >= 0.75;
            if (shouldBeWall) this.grid[y][x].type = NodeType.Wall;
          }

      algorithmResult = this.algorithmService.runBFSAlgorithm(this.grid);
      let goodToGo: boolean = false;
      for (let i = 0; i < algorithmResult.path.length; i++)
        if (algorithmResult.path[i].type == NodeType.End)
          goodToGo = true;

      if (goodToGo) {
        this.runAlgorithmInstantly();
        return;
      }
      timesTried++;
    }
  }
}
