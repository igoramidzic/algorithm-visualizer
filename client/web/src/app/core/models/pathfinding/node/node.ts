export type GridNode = {
    xcoord: number;
    ycoord: number;
    type: NodeType;
    visited: boolean;
    isVisited?: boolean;
    isPath: boolean;
    wasAlreadyChanged?: boolean;
    bottom?: GridNode;
    top?: GridNode;
    left?: GridNode;
    right?: GridNode;
    adjacencyList?: GridNode[];
    distanceTraveled?: number;
    estimatedDistanceFromEnd?: number;
    cameFromNode?: GridNode;
}

export enum NodeType {
    Default = 1,
    Wall = 2,
    Start = 3,
    End = 4
}