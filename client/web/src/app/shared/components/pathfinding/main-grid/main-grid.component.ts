import { Component, OnInit, Input } from '@angular/core';
import { GridNode, NodeType } from 'src/app/core/models/pathfinding/node/node';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent implements OnInit {

  @Input() grid: GridNode[][];
  mouseDownOnType: NodeType;
  fromNode: GridNode;
  toNode: GridNode;

  constructor() { }

  ngOnInit(): void {
  }

  mouseDown(nodeType: NodeType): void {
    this.mouseDownOnType = nodeType;
  }

  toNodeChange(node: GridNode): void {
    if (this.mouseDownOnType)
      this.toNode = node;
  }

  fromNodeChange(node: GridNode): void {
    if (this.mouseDownOnType)
      this.fromNode = node;
  }

  changeNodeType(): void {
    if (this.mouseDownOnType == NodeType.Default &&
      this.toNode.type == NodeType.Default) {
      this.toNode.type = NodeType.Wall;
      this.fromNodeChange(this.toNode);
    }
    else if (this.mouseDownOnType == NodeType.Wall &&
      this.toNode.type == NodeType.Wall) {
      this.toNode.type = NodeType.Default;
      this.fromNodeChange(this.toNode);
    }
    else if (this.mouseDownOnType == NodeType.Start &&
      this.toNode.type == NodeType.Default) {
      if (this.fromNode.type == NodeType.Start || this.fromNode.type == NodeType.Default) {
        this.toNode.type = NodeType.Start;
        this.fromNode.type = NodeType.Default;
        this.fromNodeChange(this.toNode);
      }
    }
    else if (this.mouseDownOnType == NodeType.End &&
      this.toNode.type == NodeType.Default) {
      if (this.fromNode.type == NodeType.End || this.fromNode.type == NodeType.Default) {
        this.toNode.type = NodeType.End;
        this.fromNode.type = NodeType.Default;
        this.fromNodeChange(this.toNode);
      }
    }
  }
}