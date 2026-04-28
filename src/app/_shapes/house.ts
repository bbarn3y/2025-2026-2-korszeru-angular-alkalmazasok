import {CustomShape} from './custom-shape.interface';
import Konva from 'konva';
import {ShapeType} from '../_models/konva';


export class House implements CustomShape {
  draggable: boolean;
  height: number;
  shapeType: ShapeType;
  width: number;
  x: number;
  y: number;

  constructor(x: number, y: number, width: number, height: number, draggable: boolean) {
    this.shapeType = ShapeType.HOUSE;
    this.draggable = draggable;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  addShapeListeners(group: Konva.Group): void {
    group.off('mouseenter');
    group.off('mouseleave');
    group.on('mouseenter', () => {
      group.scale({ x: 1.2, y: 1.5})
    });
    group.on('mouseleave', () => {
      group.scale( { x: 1, y: 1 });
    })
  }

  draw(layer: Konva.Layer): Konva.Group {
    const shape = this.shape();
    layer.add(shape);
    return shape;
  }

  shape(): Konva.Group {
    const group = new Konva.Group({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      draggable: this.draggable,
      shapeType: this.shapeType
    });
    const body = new Konva.Rect({
      x: 0,
      y: this.height / 2,
      width: this.width,
      height: this.height / 2,
      fill: 'aqua',
      stroke: 'black',
      strokeWidth: 1,
    })
    const head = new Konva.Line({
      points: [
        0,
        this.height / 2,
        this.width / 2,
        0,
        this.width,
        this.height / 2
      ],
      closed: true,
      fill: 'aqua',
      stroke: 'black',
      strokeWidth: 1
    })

    group.add(head, body);

    this.addShapeListeners(group);

    return group;
  }

}
