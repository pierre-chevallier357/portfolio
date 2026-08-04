import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../directives/in-view/in-view';
import { ContentService } from '../../services/content/content';
import { LanguageService } from '../../services/language/language';

@Component({
  selector: 'about',
  imports: [NgOptimizedImage, InView],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  protected readonly age: number = this.calculateAge(new Date('2000-10-20'));
  private readonly contentService: ContentService = inject(ContentService);
  private readonly languageService: LanguageService = inject(LanguageService);
  protected readonly rawParagraphs: Signal<string[]> = this.contentService.getAboutParagraphs();
  protected readonly title: Signal<string> = this.contentService.getNavLinkText('about');
  protected readonly paragraphs: Signal<string[]> = computed(() =>
    this.rawParagraphs().map((paragraph) => paragraph.replace('{{age}}', `${this.age}`)),
  );
  protected readonly portraitAlt: Signal<string> = computed(() =>
    this.languageService.isFrench() ? 'Portrait de Pierre' : 'Portrait of Pierre',
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
