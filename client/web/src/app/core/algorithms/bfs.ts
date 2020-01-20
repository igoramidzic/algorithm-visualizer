import { GridNode } from '../models/pathfinding/node/node';

export const bfs = (startNode: GridNode, endNode: GridNode): { visited: GridNode[], path: GridNode[] } => {
    let visited: GridNode[] = [];
    let path: GridNode[] = [];

    // Construct a queue of paths
    let queue: GridNode[][] = [];
    startNode.isVisited = true;
    queue.push([startNode]);

    while (queue.length > 0) {
        // Grab the first path in the queue
        path = queue.shift();

        // Grab the last node in the path
        let node: GridNode = path[path.length - 1];

        // Check if last node is the end node. If so, we've found the end, return.
        if (node == endNode)
            break;

        // For each node in the adjacency list of the last node in the path:
        for (let i = 0; i < node.adjacencyList.length; i++) {
            // Skip if it was already visited
            if (node.adjacencyList[i].isVisited)
                continue;

            // mark it visited, push to visited array
            node.adjacencyList[i].isVisited = true;
            visited.push(node.adjacencyList[i]);

            // Create new path by appending the current node to the end of the current path
            let newPath = path.slice();
            newPath.push(node.adjacencyList[i]);
            queue.push(newPath);
        }
    }

    if (path[path.length - 1] != endNode)
        path = [startNode];

    return { visited, path };
}