import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { Experience } from '../../models/experience';
import { SkillCategory } from '../../models/skill';
import { NavLink } from '../../models/nav-link';
import { LanguageStore } from '../language-store/language-store';
import { HomeTitle } from '../../models/home-title';

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
    'header',
    'nav-links.json',
  ).pipe(shareReplay(1));

  public getHomeTitle(): Signal<HomeTitle> {
    return toSignal(this.getLocalized<HomeTitle>('home', 'title.json'), {
      initialValue: {} as HomeTitle,
    });
  }

  public getExperiences(): Signal<Experience[]> {
    return toSignal(this.getLocalized<Experience[]>('experiences', 'experiences.json'), {
      initialValue: [],
    });
  }

  public getSkillCategories(): Signal<SkillCategory[]> {
    return toSignal(this.getLocalized<SkillCategory[]>('skills', 'skills.json'), {
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
    return toSignal(this.getLocalized<string[]>('about', 'about.json'), {
      initialValue: [],
    });
  }

  public getTypewriterWords$(): Observable<string[]> {
    return this.getLocalized<string[]>('home', 'typewriter-words.json');
  }

  private getLocalized<T>(category: string, fileName: string): Observable<T> {
    return toObservable(this.languageFolder).pipe(
      switchMap((languageFolder) =>
        this.httpClient.get<T>(`text/${category}/${languageFolder}/${fileName}`),
      ),
    );
  }
}
