import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuraBackground } from './aura-background';

describe('AuraBackground', () => {
  let component: AuraBackground;
  let fixture: ComponentFixture<AuraBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuraBackground],
    }).compileComponents();

    fixture = TestBed.createComponent(AuraBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
