import { GridNode } from '../models/pathfinding/node/node';

export const bfs = (startNode: GridNode, endNode: GridNode): { visited: GridNode[], path: GridNode[] } => {
    let visited: GridNode[] = [];
    let path: GridNode[] = [];

    let queue: GridNode[] = [];
    startNode.isVisited = true;
    queue.push(startNode);

    while (queue.length > 0) {
        let node: GridNode = queue[0];

        visited.push(node);
        path.push(node);

        if (node == endNode)
            break;

        queue.shift();

        for (let i = 0; i < node.adjacencyList.length; i++)
            if (!node.adjacencyList[i].isVisited) {
                node.adjacencyList[i].isVisited = true;
                queue.push(node.adjacencyList[i]);
            }
    }

    return { visited, path };
}