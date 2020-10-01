import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignOutComponent } from './modal-sign-out.component';

describe('ModalSignOutComponent', () => {
  let component: ModalSignOutComponent;
  let fixture: ComponentFixture<ModalSignOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSignOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
