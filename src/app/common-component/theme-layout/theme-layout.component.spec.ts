import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeLayoutComponent } from './theme-layout.component';

describe('ThemeLayoutComponent', () => {
  let component: ThemeLayoutComponent;
  let fixture: ComponentFixture<ThemeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
