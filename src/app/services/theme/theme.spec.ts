import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    window.localStorage.removeItem('theme');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle between light and dark and persist the choice', () => {
    const initialTheme = service.theme();

    service.toggleTheme();

    const toggledTheme = initialTheme === 'dark' ? 'light' : 'dark';
    expect(service.theme()).toBe(toggledTheme);
    expect(window.localStorage.getItem('theme')).toBe(toggledTheme);
  });
});
