import { Component, OnInit } from '@angular/core';
import { PathfindingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GridNode, NodeType } from 'src/app/core/models/pathfinding/node/node';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.scss']
})
export class PathfindingComponent implements OnInit {

  algorithm: PathfindingAlgorithm;
  PathfindingAlgorithm = PathfindingAlgorithm;
  grid: GridNode[][];

  constructor(private route: ActivatedRoute, private router: Router) { }

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
        node = this.createNode(this.determineNodeType(gridSizes, x, y));
        this.grid[y][x] = node;
      }
    }
  }

  calculateGridSize(): { x: number, y: number } {
    return { x: 40, y: 20 };
  }

  createNode(type: NodeType): GridNode {
    return { type, visited: false, isPath: false }
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
  }
}
