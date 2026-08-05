import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../directives/in-view/in-view';
import { SkillCategory } from '../../models/skill';
import { TextProvider } from '../../services/text-provider/text-provider';

@Component({
  selector: 'skills',
  imports: [InView],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly textProvider: TextProvider = inject(TextProvider);
  protected readonly categories: Signal<SkillCategory[]> = this.textProvider.getSkillCategories();
  protected readonly title: Signal<string> = this.textProvider.getNavLinkText('skills');
}
