import { Injectable } from '@angular/core';
import { PathfindingAlgorithm } from 'src/app/core/models/algorithm/algorithm';
import { GridNode, NodeType } from 'src/app/core/models/pathfinding/node/node';
import { dijkstras } from 'src/app/core/algorithms/dijkstras';
import { dfs } from 'src/app/core/algorithms/dfs';
import { bfs } from 'src/app/core/algorithms/bfs';

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

  runDijkstrasAlgorithm(grid: GridNode[][]): { visited: GridNode[], path: GridNode[] } {
    this.fillAdjacencyListForNodes(grid);
    return dijkstras(this.getStart(grid), this.getEnd(grid));
  }

  runBFSAlgorithm(grid: GridNode[][]): { visited: GridNode[], path: GridNode[] } {
    this.fillAdjacencyListForNodes(grid);
    return bfs(this.getStart(grid), this.getEnd(grid));
  }

  runDFSAlgorithm(grid: GridNode[][]): { visited: GridNode[], path: GridNode[] } {
    this.fillAdjacencyListForNodes(grid);
    return dfs(this.getStart(grid), this.getEnd(grid));
  }

  runAStarAlgorithm(grid: GridNode[][]): { visited: GridNode[], path: GridNode[] } {
    this.fillAdjacencyListForNodes(grid);
    return { visited: [], path: [] };
  }

  private fillAdjacencyListForNodes(grid: GridNode[][]): GridNode[] {
    let nodes: GridNode[] = [];
    let node: GridNode;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        node = grid[y][x];
        node.isVisited = false;
        node.adjacencyList = [];

        let top, right, bottom, left: GridNode;

        if (y > 0)
          top = grid[y - 1][x];
        if (x < grid[y].length)
          right = grid[y][x + 1];
        if (y < grid.length - 1)
          bottom = grid[y + 1][x];
        if (x > 0)
          left = grid[y][x - 1];

        if (top && top.type != NodeType.Wall)
          node.adjacencyList.push(top);
        if (right && right.type != NodeType.Wall)
          node.adjacencyList.push(right);
        if (bottom && bottom.type != NodeType.Wall)
          node.adjacencyList.push(bottom);
        if (left && left.type != NodeType.Wall)
          node.adjacencyList.push(left);

        nodes.push(node);
      }
    }

    return nodes;
  }

  private getStart(grid: GridNode[][]): GridNode {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x].type == NodeType.Start)
          return grid[y][x];
      }
    }

  }

  private getEnd(grid: GridNode[][]): GridNode {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x].type == NodeType.End)
          return grid[y][x];
      }
    }
  }
}
