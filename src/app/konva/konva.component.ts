import {AfterViewInit, Component, ElementRef, inject, viewChild} from '@angular/core';
import Konva from "konva";
import {NgTemplateOutlet} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCardModule} from 'ng-zorro-antd/card';
import {EditorMode, ShapeType} from '../_models/konva';
import {House} from '../_shapes/house';
import {NzContextMenuService, NzDropdownMenuComponent, NzDropdownModule} from 'ng-zorro-antd/dropdown';
import {Car} from '../_shapes/car';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-konva',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzDropdownModule,
    NzRadioGroupComponent,
    NzRadioComponent,
    FormsModule,
  ],
  templateUrl: './konva.component.html',
  styleUrl: './konva.component.less',
})
export class KonvaComponent implements AfterViewInit {
  private readonly nzContextMenuService: NzContextMenuService = inject(NzContextMenuService);

  contextMenuEl = viewChild.required<NzDropdownMenuComponent>('menu');
  konvaContainer = viewChild.required<ElementRef<HTMLDivElement>>('konvaContainer');

  editorMode: EditorMode = EditorMode.SELECT;
  leftClickedShape: Konva.Shape | Konva.Group | null = null;
  rightClickedShape: Konva.Shape | Konva.Group | null = null;
  selectedLayer?: Konva.Layer;
  selectedLayerIndex = 0;
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
            if (pointerPosition) {
              const car = new Car(
                (pointerPosition.x - this.stage.x()) / this.stage.scale().x,
                (pointerPosition.y - this.stage.y()) / this.stage.scale().y,
                50,
                50,
                false
              )
              console.log('car', car);
              car.draw(this.selectedLayer);
            }
            break;
          case EditorMode.HOUSE:
            if (pointerPosition) {
              const house = new House(
                (pointerPosition.x - this.stage.x()) / this.stage.scale().x,
                (pointerPosition.y - this.stage.y()) / this.stage.scale().y,
                50,
                75,
                true);
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

        if (this.rightClickedShape) {
          this.nzContextMenuService.create({
            x: event.target.getClientRect().x,
            y: event.target.getClientRect().y,
          }, this.contextMenuEl())
        }
      });

      this.stage.on('wheel', (event) => {
        event.evt.preventDefault();
        if (!this.stage) {
          return;
        }

        let currentScale = this.stage.scale().x;
        let pendingScaleBy = 1.05;
        let direction = event.evt.deltaY;
        let pointerPosition = this.stage.getPointerPosition();

        if (pointerPosition) {
          let mousePointsTo = {
            x: (pointerPosition.x - this.stage.x()) / currentScale,
            y: (pointerPosition.y - this.stage.y()) / currentScale,
          };

          const newScale = direction < 0 ? currentScale * pendingScaleBy : currentScale / pendingScaleBy;

          this.stage.position({
            x: pointerPosition.x - mousePointsTo.x * newScale,
            y: pointerPosition.y - mousePointsTo.y * newScale,
          });

          this.stage.scale({
            x: newScale,
            y: newScale
          });
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
    if (this.rightClickedShape) {
      this.rightClickedShape.destroy();
      this.transformer?.nodes([]);
    }
  }

  makeMeRed(shape?: Konva.Group | Konva.Shape | null) {
    if (!shape) return;

    if (shape instanceof Konva.Group) {
      shape.children.forEach(this.makeMeRed);
    } else {
      shape.to({
        fill: 'red',
        duration: 1,
        easing: Konva.Easings.Linear
      })
    }
  }

  moveToClosestHouse() {

    if (!this.stage || !this.rightClickedShape) return;

    // Find all House nodes
    const houses = this.stage
      .find('Group')
      .filter((node) => node.getAttr('shapeType') === ShapeType.HOUSE)

    if (!houses.length) return;

    const clickedCarPosition = this.rightClickedShape?.position();

    if (!clickedCarPosition) return;

    const nearestHouse = houses
      .sort((a, b) => {
        const aPos = a.position();
        const bPos = b.position();
        const distA = Math.hypot(aPos.x - clickedCarPosition.x, aPos.y - clickedCarPosition.y);
        const distB = Math.hypot(bPos.x - clickedCarPosition.x, bPos.y - clickedCarPosition.y);

        return distA - distB;
      })[0];

    const nearestHousePosition = nearestHouse.position();

    this.rightClickedShape.to({
      x: nearestHousePosition.x,
      y: nearestHousePosition.y + (nearestHouse.getAttr('height') ?? 0) + this.rightClickedShape.height() + 10,
      duration: 2,
      easing: Konva.Easings.EaseIn
    })
  }

  selectedLayerIndexChanged(layerIndex: number) {
    if (!this.stage) return;
    this.selectedLayer = this.stage.getLayers()[layerIndex];
  }

  protected readonly EditorMode = EditorMode;
}
