import { GridNode } from '../models/pathfinding/node/node';

export const dijkstras = (startNode: GridNode, endNode: GridNode): { visited: GridNode[], path: GridNode[] } => {
    let visited: GridNode[] = [];
    let shortestPathTree: GridNode[] = [];

    let currentNode: GridNode;

    return { visited, path: shortestPathTree };
}