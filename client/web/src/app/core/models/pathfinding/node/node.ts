export type GridNode = {
    type: NodeType,
    visited: boolean,
    isPath: boolean;
    wasAlreadyChanged?: boolean;
}

export enum NodeType {
    Default = 1,
    Wall = 2,
    Start = 3,
    End = 4
}