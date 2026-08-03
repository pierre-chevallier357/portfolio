import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../directives/in-view/in-view';
import { SkillCategory } from '../../models/skill';
import { ContentService } from '../../services/content/content';

@Component({
  selector: 'skills',
  imports: [InView],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly contentService: ContentService = inject(ContentService);
  protected readonly categories: Signal<SkillCategory[]> = this.contentService.getSkillCategories();
}
