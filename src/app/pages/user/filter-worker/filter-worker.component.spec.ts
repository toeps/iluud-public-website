import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWorkerComponent } from './filter-worker.component';

describe('FilterWorkerComponent', () => {
  let component: FilterWorkerComponent;
  let fixture: ComponentFixture<FilterWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
