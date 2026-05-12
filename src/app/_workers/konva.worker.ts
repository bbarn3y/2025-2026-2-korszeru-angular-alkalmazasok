import {GenerateWorkerEvent, ShapesChangedWorkEvent, WorkerEvent, WorkerEventType} from '../_models/worker';
import Konva from 'konva';
import {interval} from 'rxjs';

Konva.Util.createCanvasElement = () => {
  const canvas = new OffscreenCanvas(1, 1);
  (canvas as any).style = {};
  return canvas as any;
};

let blinkingElements: Konva.Rect[] = [];
const colors = ['red', 'orange', 'green', 'blue', 'aqua'];
let nextElementId = 0;

console.log('Worker starting...');

self.onmessage = function(event) {
  console.log('Web Worker received message', event);

  const workerEvent: WorkerEvent  = event.data;

  switch (workerEvent.type) {
    case WorkerEventType.GENERATE:
      const generateWorkerEvent = workerEvent as GenerateWorkerEvent;
      postMessage(new ShapesChangedWorkEvent(createRandomObjects(generateWorkerEvent.count), [], []));
      break;
    default:
      console.log(`Received unhandled event type [${workerEvent.type}].`);
      break;
  }

}

function createRandomObjects(amount: number): string[] {
  const addedShapes: string[] = [];
  for (let i = 0; i < amount; i++) {
    addedShapes.push(createRandomRect(nextElementId++));
  }
  return addedShapes;
}

function createRandomRect(index: number): string {
  const originalFillColor = colors[Math.floor(Math.random() * colors.length)];
  const isBlinking = Math.random() < 0.5;
  const rect = new Konva.Rect({
    elementId: `Rect_${index}`,
    x: Math.floor((Math.random() * 1000)),
    y: Math.floor((Math.random() * 1000)),
    width: Math.floor((Math.random() * 500)),
    height: Math.floor((Math.random() * 500)),
    stroke: 'black',
    fill: originalFillColor,
  });
  if (isBlinking) {
    blinkingElements.push(rect);
  }
  return rect.toJSON();
}

postMessage('Hi there, konva.component!');

interval(1000).subscribe(() => {
  if (blinkingElements.length > 0) {
    const serializedChangedElements = blinkingElements.map((element) => {
      const otherColors = colors.filter((c) => c !== element.fill());
      element.fill(otherColors[Math.floor(Math.random() * otherColors.length)]);
      return element.toJSON();
    })
    postMessage(new ShapesChangedWorkEvent([], serializedChangedElements, []));
  }
});
