import Konva from "konva";
import {ShapeType} from '../_models/konva';


export interface CustomShape {
  shapeType: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;

  addShapeListeners(group: Konva.Group): void;
  draw(layer: Konva.Layer): Konva.Group;
  shape(): Konva.Group;
}
