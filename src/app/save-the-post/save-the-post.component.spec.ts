import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveThePostComponent } from './save-the-post.component';

describe('SaveThePostComponent', () => {
  let component: SaveThePostComponent;
  let fixture: ComponentFixture<SaveThePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveThePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveThePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
