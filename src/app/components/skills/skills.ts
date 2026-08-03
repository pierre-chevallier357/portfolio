import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { InView } from '../../directives/in-view/in-view';
import { SkillCategory } from '../../models/skill';

@Component({
  selector: 'skills',
  imports: [InView],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly http: HttpClient = inject(HttpClient);
  protected readonly categories: Signal<SkillCategory[]> = toSignal(
    this.http.get<SkillCategory[]>('data/skills.json'),
    { initialValue: [] },
  );
}
