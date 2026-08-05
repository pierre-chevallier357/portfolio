import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { Experience } from './experience';
import { SkillCategory } from './skill';
import { NavLink } from './nav-link';
import { LanguageStore } from '../core/language/language-store';
import { HomeTitle } from './home-title';

@Injectable({
  providedIn: 'root',
})
export class TextProvider {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  private readonly languageFolder: Signal<string> = computed(() =>
    this.languageStore.language() === 'fr' ? 'french' : 'english',
  );
  private readonly navLinks$: Observable<NavLink[]> = this.getLocalized<NavLink[]>(
    'nav-links.json',
  ).pipe(shareReplay(1));

  public getHomeTitle(): Signal<HomeTitle> {
    return toSignal(this.getLocalized<HomeTitle>('home-title.json'), {
      initialValue: {} as HomeTitle,
    });
  }

  public getExperiences(): Signal<Experience[]> {
    return toSignal(this.getLocalized<Experience[]>('experiences.json'), {
      initialValue: [],
    });
  }

  public getSkillCategories(): Signal<SkillCategory[]> {
    return toSignal(this.getLocalized<SkillCategory[]>('skills.json'), {
      initialValue: [],
    });
  }

  public getNavLinks(): Signal<NavLink[]> {
    return toSignal(this.navLinks$, {
      initialValue: [],
    });
  }

  public getNavLinkText(id: string): Signal<string> {
    return toSignal(
      this.navLinks$.pipe(
        map((navLinks) => navLinks.find((navLink) => navLink.id === id)?.text ?? ''),
      ),
      { initialValue: '' },
    );
  }

  public getAboutParagraphs(): Signal<string[]> {
    return toSignal(this.getLocalized<string[]>('about.json'), {
      initialValue: [],
    });
  }

  public getTypewriterWords$(): Observable<string[]> {
    return this.getLocalized<string[]>('typewriter.json');
  }

  private getLocalized<T>(fileName: string): Observable<T> {
    return toObservable(this.languageFolder).pipe(
      switchMap((languageFolder) =>
        this.httpClient.get<T>(`content/${languageFolder}/${fileName}`),
      ),
    );
  }
}
