import { GridNode } from '../models/pathfinding/node/node';

export const dfs = (startNode: GridNode, endNode: GridNode): { visited: GridNode[], path: GridNode[] } => {
    let visited: GridNode[] = [];
    let path: GridNode[] = [];

    getDFSPath(startNode, endNode, visited, path);

    return { visited, path };
}


const getDFSPath = (currentNode: GridNode, endNode: GridNode, visited: GridNode[], path: GridNode[]) => {
    currentNode.isVisited = true;

    visited.push(currentNode);
    path.push(currentNode);

    if (currentNode == endNode)
        return;

    // Sort adjacency list by euclidean distance
    // ...

    for (let i = 0; i < currentNode.adjacencyList.length; i++) {
        let nextNode: GridNode = currentNode.adjacencyList[i];

        if (nextNode.isVisited)
            continue;

        getDFSPath(nextNode, endNode, visited, path);

        let lastNodeInPath: GridNode = path[path.length - 1];
        if (lastNodeInPath == endNode)
            return;
    }

    path.pop();
}