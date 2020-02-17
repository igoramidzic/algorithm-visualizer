import { GridNode, NodeType } from '../models/pathfinding/node/node';

export const astar = (startNode: GridNode, endNode: GridNode): { visited: GridNode[], path: GridNode[] } => {
    let visited: GridNode[] = [];
    let path: GridNode[] = [];

    startNode.distanceTraveled = 0;
    startNode.estimatedDistanceFromEnd = getEuclideanDistance(startNode, endNode);
    startNode.isVisited = true;
    let queue: GridNode[] = [startNode];

    getAStarPath(endNode, queue, visited);

    return { visited, path: getPath(endNode) };
}

const getAStarPath = (endNode: GridNode, queue: GridNode[], visited: GridNode[]): boolean => {
    if (queue.length == 0)
        return false;

    let currentNode: GridNode = getNextClosestNodeInQueue(queue);

    if (currentNode == endNode)
        return true;

    for (let i = 0; i < currentNode.adjacencyList.length; i++) {
        let nextNode: GridNode = currentNode.adjacencyList[i];


        // Check if node was already visited
        if (nextNode.isVisited)
            continue;

        if (nextNode.type == NodeType.Start)
            console.log("here")
        let estimatedDistanceFromEnd: number = getEuclideanDistance(nextNode, endNode);

        nextNode.estimatedDistanceFromEnd = estimatedDistanceFromEnd;

        let distanceTraveled: number = currentNode.distanceTraveled + 1;

        if (!nodeIsAlreadyInQueue(nextNode, queue)) {
            nextNode.distanceTraveled = distanceTraveled;
            nextNode.cameFromNode = currentNode;
            queue.push(nextNode);
        } else {
            if (distanceTraveled < nextNode.distanceTraveled) {
                nextNode.distanceTraveled = distanceTraveled;
                nextNode.cameFromNode = currentNode;
                queue.push(nextNode);
            }
        }
    }

    currentNode.isVisited = true;
    visited.push(currentNode);

    if (getAStarPath(endNode, queue, visited))
        return true;

    return false;
}

const getNextClosestNodeInQueue = (queue: GridNode[]): GridNode => {
    let closest: GridNode = queue[0];
    let index: number = 0;

    for (let i = 1; i < queue.length; i++)
        if (queue[i].distanceTraveled + queue[i].estimatedDistanceFromEnd < closest.distanceTraveled + closest.estimatedDistanceFromEnd) {
            closest = queue[i];
            index = i;
        }
    queue = queue.splice(index, 1);
    return closest;
}

const getEuclideanDistance = (start: GridNode, end: GridNode): number => {
    return Math.abs(Math.sqrt((start.xcoord - end.xcoord) ** 2 + (start.ycoord - end.ycoord) ** 2));
}

const getManhattanDistance = (start: GridNode, end: GridNode): number => {
    return Math.abs(start.xcoord - end.xcoord) + Math.abs(start.ycoord - end.ycoord);
}

const nodeIsAlreadyInQueue = (node: GridNode, queue: GridNode[]): boolean => {
    for (let i = 0; i < queue.length; i++)
        if (queue[i] == node)
            return true;

    return false;
}

const getPath = (endNode: GridNode): GridNode[] => {
    let path: GridNode[] = [];

    while (endNode != null) {
        path.unshift(endNode);
        endNode = endNode.cameFromNode;
    }

    return path;
}