import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridNode, NodeType } from 'src/app/core/models/pathfinding/node/node';

@Component({
  selector: 'app-grid-node',
  templateUrl: './grid-node.component.html',
  styleUrls: ['./grid-node.component.scss']
})
export class GridNodeComponent implements OnInit {

  @Input() node: GridNode;
  @Input() mouseDownOnType: NodeType;
  @Output() mouseDownFromNode: EventEmitter<NodeType> = new EventEmitter();
  @Output() toNodeEmitter: EventEmitter<GridNode> = new EventEmitter();
  @Output() fromNodeEmitter: EventEmitter<GridNode> = new EventEmitter();
  @Output() changeNodeEmitter: EventEmitter<boolean> = new EventEmitter();
  NodeType = NodeType;

  constructor() { }

  ngOnInit() {
  }

  mouseDown(): void {
    this.mouseDownFromNode.emit(this.node.type);
    this.fromNodeEmitter.emit(this.node);
    this.toNodeEmitter.emit(this.node);
    this.changeNodeEmitter.emit(true);
  }

  mouseUp(): void {
    this.mouseDownFromNode.emit(null);
  }

  mouseEnter(): void {
    this.toNodeEmitter.emit(this.node);

    if (this.mouseDownOnType)
      this.changeNodeEmitter.emit(true);
  }
}
