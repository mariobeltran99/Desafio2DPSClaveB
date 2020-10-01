import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRepairsComponent } from './manage-repairs.component';

describe('ManageRepairsComponent', () => {
  let component: ManageRepairsComponent;
  let fixture: ComponentFixture<ManageRepairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRepairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
