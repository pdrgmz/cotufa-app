import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesextraComponent } from './moviesextra.component';

describe('MoviesextraComponent', () => {
  let component: MoviesextraComponent;
  let fixture: ComponentFixture<MoviesextraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesextraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesextraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
