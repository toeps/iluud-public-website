import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavFolderListComponent } from './fav-folder-list.component';

describe('FavFolderListComponent', () => {
  let component: FavFolderListComponent;
  let fixture: ComponentFixture<FavFolderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavFolderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavFolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
