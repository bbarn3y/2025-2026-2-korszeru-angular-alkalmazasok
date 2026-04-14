import {AfterViewInit, Component, ElementRef, viewChild} from '@angular/core';
import Konva from "konva";

@Component({
  selector: 'app-konva',
  standalone: true,
  imports: [],
  templateUrl: './konva.component.html',
  styleUrl: './konva.component.less',
})
export class KonvaComponent implements AfterViewInit {

  konvaContainer = viewChild.required<ElementRef<HTMLDivElement>>('konvaContainer');

  selectedLayer?: Konva.Layer;
  stage?: Konva.Stage;
  transformer?: Konva.Transformer;

  ngAfterViewInit() {
    this.stage = new Konva.Stage({
      // container: 'konva-container',
      container: this.konvaContainer().nativeElement,
      width: window.innerWidth,
      height: window.innerHeight
    })

    const layer1 = new Konva.Layer();
    const layer2 = new Konva.Layer();
    this.stage.add(layer1, layer2);

    this.selectedLayer = this.stage.getLayers()[0];

    this.transformer = new Konva.Transformer();
    this.selectedLayer.add(this.transformer);

    const rect = new Konva.Rect({
      x: 50,
      y: 100,
      width: 200,
      height: 75,
      fill: 'aqua',
      stroke: '#F2F2F2',
      strokeWidth: 5,
      draggable: true
    })
    this.selectedLayer.add(rect);

    this.transformer.nodes([rect]);
  }

}
