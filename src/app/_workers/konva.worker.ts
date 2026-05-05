import {WorkerEvent, WorkerEventType} from '../_models/worker';

console.log('Worker starting...');

self.onmessage = function(event) {
  console.log('Web Worker received message', event);

  const workerEvent: WorkerEvent  = event.data;

  switch (workerEvent.type) {
    case WorkerEventType.GENERATE:
      break;
    default:
      console.log(`Received unhandled event type [${workerEvent.type}].`);
      break;
  }

}


postMessage('Hi there, konva.component!');
