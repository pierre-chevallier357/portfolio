import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfWritingText } from './self-writing-text';

describe('SelfWritingText', () => {
  let component: SelfWritingText;
  let fixture: ComponentFixture<SelfWritingText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfWritingText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfWritingText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
