import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavLinks } from './header-nav-links';

describe('HeaderNavLinks', () => {
  let component: HeaderNavLinks;
  let fixture: ComponentFixture<HeaderNavLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNavLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNavLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
