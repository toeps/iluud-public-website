import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchworkerComponent } from './searchworker.component';

describe('SearchworkerComponent', () => {
  let component: SearchworkerComponent;
  let fixture: ComponentFixture<SearchworkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchworkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
