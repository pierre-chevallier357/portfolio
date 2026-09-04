import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { ExperienceContent } from './experience-content';
import { SkillsContent } from './skills-content';
import { HeaderContent } from './header-content';
import { LanguageStore } from '../core/language/language-store';
import { HomeContent } from './home-content';
import { ContactContent } from './contact-content';
import { FooterContent } from './footer-content';
import { AboutContent } from './about-content';
import { EducationContent } from './education-content';

@Injectable({
  providedIn: 'root',
})
export class ContentProvider {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  private readonly languageFolder: Signal<string> = computed(() =>
    this.languageStore.language()?.code === 'fr' ? 'french' : 'english',
  );
  private readonly headerContent$: Observable<HeaderContent> = this.getLocalized<HeaderContent>(
    'header.json',
  ).pipe(shareReplay(1));
  private readonly typewriterWords$: Observable<string[]> = this.getLocalized<HomeContent>(
    'home.json',
  ).pipe(
    map((homeContent) => homeContent.typewriter),
    shareReplay(1),
  );

  public getSectionTitle(id: string): Signal<string> {
    return toSignal(
      this.headerContent$.pipe(
        map((navLinks) => navLinks.find((navLink) => navLink.id === id)?.text ?? ''),
      ),
      { initialValue: '' },
    );
  }

  public getHeaderContent(): Signal<HeaderContent> {
    return toSignal(this.headerContent$, {
      initialValue: [],
    });
  }

  public getHomeContent(): Signal<HomeContent> {
    return toSignal(this.getLocalized<HomeContent>('home.json'), {
      initialValue: {} as HomeContent,
    });
  }

  public getTypewriterContent$(): Observable<string[]> {
    return this.typewriterWords$;
  }

  public getAboutContent(): Signal<AboutContent> {
    return toSignal(this.getLocalized<AboutContent>('about.json'), {
      initialValue: [],
    });
  }

  public getSkillsContent(): Signal<SkillsContent> {
    return toSignal(this.getLocalized<SkillsContent>('skills.json'), {
      initialValue: [],
    });
  }

  public getExperienceContent(): Signal<ExperienceContent> {
    return toSignal(this.getLocalized<ExperienceContent>('experience.json'), {
      initialValue: [],
    });
  }

  public getEducationContent(): Signal<EducationContent> {
    return toSignal(this.getLocalized<EducationContent>('education.json'), {
      initialValue: {} as EducationContent,
    });
  }

  public getContactContent(): Signal<ContactContent> {
    return toSignal(this.getLocalized<ContactContent>('contact.json'), {
      initialValue: {} as ContactContent,
    });
  }

  public getFooterContent(): Signal<FooterContent> {
    return toSignal(this.getLocalized<FooterContent>('footer.json'), {
      initialValue: {} as FooterContent,
    });
  }

  private getLocalized<T>(fileName: string): Observable<T> {
    return toObservable(this.languageFolder).pipe(
      switchMap((languageFolder) =>
        this.httpClient.get<T>(`content/${languageFolder}/${fileName}`),
      ),
    );
  }
}
