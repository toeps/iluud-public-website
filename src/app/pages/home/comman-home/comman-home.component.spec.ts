import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanHomeComponent } from './comman-home.component';

describe('CommanHomeComponent', () => {
  let component: CommanHomeComponent;
  let fixture: ComponentFixture<CommanHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommanHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
