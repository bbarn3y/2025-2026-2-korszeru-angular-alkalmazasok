import {Directive, ElementRef, inject, input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appSelectedCharacter]',
  standalone: false
})
export class SelectedCharacterDirective implements OnChanges {

  color = input<string>('black');
  selected = input<boolean>(false);

  private readonly elRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.highlight();
  }

  private highlight() {
    if (this.selected()) {
      // this.elRef.nativeElement.style.border = `3px solid ${this.color()}`;
      this.renderer.setStyle(this.elRef.nativeElement, 'border', `3px solid ${this.color()}`)
    } else {
      // this.elRef.nativeElement.style.border = `unset`;
      this.renderer.setStyle(this.elRef.nativeElement, 'border', 'unset');
    }
  }

}
