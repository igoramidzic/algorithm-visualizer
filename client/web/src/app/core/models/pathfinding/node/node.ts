export type GridNode = {
    type: NodeType,
    visited: boolean,
    isPath: boolean;
    wasAlreadyChanged?: boolean;
    bottom?: GridNode;
    top?: GridNode;
    left?: GridNode;
    right?: GridNode;
    distance?: number;
    isVisited?: boolean;
    adjacencyList?: GridNode[];
}

export enum NodeType {
    Default = 1,
    Wall = 2,
    Start = 3,
    End = 4
}