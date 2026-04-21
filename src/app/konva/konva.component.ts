import {AfterViewInit, Component, ElementRef, inject, viewChild} from '@angular/core';
import Konva from "konva";
import {NgTemplateOutlet} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCardModule} from 'ng-zorro-antd/card';
import {EditorMode} from '../_models/konva';
import {House} from '../_shapes/house';
import {NzContextMenuService, NzDropdownMenuComponent, NzDropdownModule} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-konva',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzDropdownModule,
  ],
  templateUrl: './konva.component.html',
  styleUrl: './konva.component.less',
})
export class KonvaComponent implements AfterViewInit {
  private readonly nzContextMenuService: NzContextMenuService = inject(NzContextMenuService);

  contextMenuEl = viewChild.required<ElementRef<NzDropdownMenuComponent>>('menu');
  konvaContainer = viewChild.required<ElementRef<HTMLDivElement>>('konvaContainer');

  editorMode: EditorMode = EditorMode.SELECT;
  leftClickedShape: Konva.Shape | Konva.Group | null = null;
  rightClickedShape: Konva.Shape | Konva.Group | null = null;
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

    const house = new House(100, 200, 50, 75, true);
    house.draw(this.selectedLayer);

    this.transformer.nodes([rect]);

    this.addStageEventListener();
  }

  addStageEventListener() {
    if (this.stage) {
      this.stage.on('click', (event) => {
        if (!this.stage || !this.selectedLayer) {
          return;
        }
        // console.log('stage', this.stage);
        let pointerPosition = this.stage.getPointerPosition();
        this.leftClickedShape = this.getClickTarget(event.target);
        console.log('Left clicked shape: ', this.leftClickedShape);

        switch (this.editorMode) {
          case EditorMode.CAR:
            break;
          case EditorMode.HOUSE:
            if (pointerPosition) {
              const house = new House(pointerPosition.x, pointerPosition.y, 50, 75, true);
              house.draw(this.selectedLayer);
            }
            break;
          case EditorMode.SELECT:
            if (this.leftClickedShape) {
              this.transformer?.nodes([this.leftClickedShape]);
            } else {
              this.transformer?.nodes([]);
            }
            break;
        }
      })

      this.stage.on('contextmenu', (event) => {
        event.evt.preventDefault();
        if (!this.stage || !this.selectedLayer) {
          return;
        }
        this.rightClickedShape = this.getClickTarget(event.target);

        // @todo Fix!
        if (this.rightClickedShape) {
          this.nzContextMenuService.create({
            x: event.target.x(),
            y: event.target.y(),
          }, this.contextMenuEl().nativeElement)
        }
      });
    }
  }

  getClickTarget(target: Konva.Shape | Konva.Stage): Konva.Shape | Konva.Group | null {
    if (target instanceof Konva.Stage) {
      return null;
    } else if (target.getAttr('shapeType')) {
      return target;
    } else if (target.parent !== null && target.parent.getAttr('shapeType')) {
      return target.parent as Konva.Group;
    } else {
      return target;
    }
  }

  deleteShape() {

  }

  moveToOrigo() {

  }

  protected readonly EditorMode = EditorMode;
}
