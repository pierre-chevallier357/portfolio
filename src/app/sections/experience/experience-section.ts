import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { ExperienceContent } from '../../content/experience-content';
import { ContentProvider } from '../../content/content-provider';
import { CompanySection } from './company-section/company-section';

@Component({
  selector: 'portfolio-experience-section',
  imports: [InView, CompanySection],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.scss',
})
export class ExperienceSection {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly experience: Signal<ExperienceContent> =
    this.contentProvider.getExperienceContent();
  protected readonly title: Signal<string> = this.contentProvider.getSectionTitle('experience');
}
