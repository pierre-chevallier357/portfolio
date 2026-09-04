import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { SkillsContent } from '../../content/skills-content';
import { ContentProvider } from '../../content/content-provider';

@Component({
  selector: 'portfolio-skills-section',
  imports: [InView],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.scss',
})
export class SkillsSection {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly categories: Signal<SkillsContent> = this.contentProvider.getSkillsContent();
  protected readonly title: Signal<string> = this.contentProvider.getSectionTitle('skills');
}
