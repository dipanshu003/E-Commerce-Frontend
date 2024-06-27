import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrNavbarComponent } from './sr-navbar.component';

describe('SrNavbarComponent', () => {
  let component: SrNavbarComponent;
  let fixture: ComponentFixture<SrNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
