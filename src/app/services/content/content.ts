import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience';
import { SkillCategory } from '../../models/skill';
import { NavLink } from '../../models/nav-link';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly baseUrl: string = 'text';
  private readonly http: HttpClient = inject(HttpClient);

  public getExperiences(): Signal<Experience[]> {
    return toSignal(this.http.get<Experience[]>(`${this.baseUrl}/experiences.json`), {
      initialValue: [],
    });
  }

  public getSkillCategories(): Signal<SkillCategory[]> {
    return toSignal(this.http.get<SkillCategory[]>(`${this.baseUrl}/skills.json`), {
      initialValue: [],
    });
  }

  public getNavLinks(): Signal<NavLink[]> {
    return toSignal(this.http.get<NavLink[]>(`${this.baseUrl}/nav-links.json`), {
      initialValue: [],
    });
  }

  public getAboutParagraphs(): Signal<string[]> {
    return toSignal(this.http.get<string[]>(`${this.baseUrl}/about.json`), { initialValue: [] });
  }

  public getTypewriterWords$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/typewriter-words.json`);
  }
}
