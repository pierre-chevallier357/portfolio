import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { SkillsContent } from '../../content/skills-content';
import { ContentProvider } from '../../content/content-provider';

@Component({
  selector: 'portfolio-skills',
  imports: [InView],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly categories: Signal<SkillsContent> = this.contentProvider.getSkillsContent();
  protected readonly title: Signal<string> = this.contentProvider.getNavLinkText('skills');
}
