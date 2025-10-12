import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavLinks } from './home-nav-links';

describe('HomeNavLinks', () => {
  let component: HomeNavLinks;
  let fixture: ComponentFixture<HomeNavLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNavLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNavLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
