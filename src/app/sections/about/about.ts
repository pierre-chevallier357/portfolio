import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { ContentProvider } from '../../content/content-provider';
import { LanguageStore } from '../../core/language/language-store';
import { AboutContent } from '../../content/about-content';

@Component({
  selector: 'portfolio-about',
  imports: [NgOptimizedImage, InView],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  protected readonly age: number = this.calculateAge(new Date('2000-10-20'));
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly rawParagraphs: Signal<AboutContent> = this.contentProvider.getAboutContent();
  protected readonly paragraphs: Signal<string[]> = computed(() =>
    this.rawParagraphs().map((paragraph) => paragraph.replace('{{age}}', `${this.age}`)),
  );
  protected readonly title: Signal<string> = this.contentProvider.getSectionTitle('about');
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly portraitAlt: Signal<string> = computed(() =>
    this.languageStore.isFrench() ? 'Portrait de Pierre' : 'Portrait of Pierre',
  );

  private calculateAge(birthDate: Date): number {
    const today: Date = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
