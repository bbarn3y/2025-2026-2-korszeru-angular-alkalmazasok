import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonvaComponent } from './konva.component';

describe('Konva', () => {
  let component: KonvaComponent;
  let fixture: ComponentFixture<KonvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonvaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonvaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
