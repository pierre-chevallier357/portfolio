import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { ContentProvider } from '../../content/content-provider';
import { FormationContent } from '../../content/formation-content';

@Component({
  selector: 'portfolio-formations',
  imports: [InView],
  templateUrl: './formations.html',
  styleUrl: './formations.scss',
})
export class Formations {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly formationsContent: Signal<FormationContent> =
    this.contentProvider.getFormationsContent();
  protected readonly title: Signal<string> = this.contentProvider.getSectionTitle('formations');
}
