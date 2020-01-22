import { GridNode } from '../models/pathfinding/node/node';

export const astar = (startNode: GridNode, endNode: GridNode): { visited: GridNode[], path: GridNode[] } => {
    let visited: GridNode[] = [];
    let path: GridNode[] = [];

    return { visited, path };
}