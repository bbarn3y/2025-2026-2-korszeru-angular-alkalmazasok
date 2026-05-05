export enum WorkerEventType {
  GENERATE = 'GENERATE',
  SHAPES_CHANGED = 'SHAPES_CHANGED'
}

export class WorkerEvent {
  type: WorkerEventType;

  constructor(type: WorkerEventType) {
    this.type = type;
  }
}

export class GenerateWorkerEvent extends  WorkerEvent {
  count: number;

  constructor(count: number) {
    super(WorkerEventType.GENERATE);
    this.count = count;
  }
}

export class ShapesChangedWorkEvent extends WorkerEvent {
  addedShapes?: string[];
  changedShapes?: string[];
  removedShapes?: string[];

  constructor(addedShapes: string[], changedShapes: string[], removedShapes: string[]) {
    super(WorkerEventType.SHAPES_CHANGED);
    this.addedShapes = addedShapes;
    this.changedShapes = changedShapes;
    this.removedShapes = removedShapes;
  }
}

