import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteRepairsComponent } from './modal-delete-repairs.component';

describe('ModalDeleteRepairsComponent', () => {
  let component: ModalDeleteRepairsComponent;
  let fixture: ComponentFixture<ModalDeleteRepairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteRepairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
