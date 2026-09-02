import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { ContentProvider } from '../../content/content-provider';
import { EducationContent } from '../../content/education-content';

@Component({
  selector: 'portfolio-education',
  imports: [InView],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly educationContent: Signal<EducationContent> =
    this.contentProvider.getEducationContent();
  protected readonly title: Signal<string> = this.contentProvider.getSectionTitle('education');
}
