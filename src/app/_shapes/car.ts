import Konva from 'konva';
import { CustomShape } from './custom-shape.interface';
import {ShapeType} from "../_models/konva";

export class Car implements CustomShape {
    shapeType: ShapeType;
    x: number;
    y: number;
    width: number;
    height: number;
    draggable: boolean;

    constructor(x: number, y: number, width: number, height: number, draggable: boolean = true) {
        this.shapeType = ShapeType.CAR;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draggable = draggable;

        console.log('Creating Car with', {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        });
    }
    draw(layer: Konva.Layer): Konva.Group {
        const group = this.shape();
        layer.add(group);
        return group;
    }

    shape(): Konva.Group {
        const group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: this.draggable,
            shapeType: ShapeType.CAR,
            shapeWidth: this.width,
            shapeHeight: this.height
        });

        const bodyHeight = this.height * 0.5;
        const wheelRadius = this.height * 0.25;

        // --- Car body (polygon using Line) ---
        const body = new Konva.Line({
            points: [
                0, bodyHeight,                         // left bottom
                this.width * 0.2, 0,                   // left roof slope
                this.width * 0.7, 0,                   // roof
                this.width, bodyHeight,                // right slope
                this.width, bodyHeight * 1.5,          // right bottom
                0, bodyHeight * 1.5                    // left bottom
            ],
            closed: true,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 2
        });

        // --- Wheels ---
        const leftWheel = new Konva.Circle({
            x: this.width * 0.25,
            y: bodyHeight * 1.5,
            radius: wheelRadius,
            fill: 'black'
        });

        const rightWheel = new Konva.Circle({
            x: this.width * 0.75,
            y: bodyHeight * 1.5,
            radius: wheelRadius,
            fill: 'black'
        });

        group.add(body);
        group.add(leftWheel);
        group.add(rightWheel);

        this.addShapeListeners(group);

        return group;
    }

    addShapeListeners(group: Konva.Group): void {
        // Optional: namespace your listeners (recommended)
        group.off('.custom');

        group.on('mouseenter.custom', () => {
            document.body.style.cursor = 'pointer';
            group.scale({ x: 1.05, y: 1.05 });
        });

        group.on('mouseleave.custom', () => {
            document.body.style.cursor = 'default';
            group.scale({ x: 1, y: 1 });
        });
    }
}
