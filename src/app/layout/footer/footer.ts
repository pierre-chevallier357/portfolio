import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ContentProvider } from '../../content/content-provider';
import { FooterContent } from '../../content/footer-content';
import { InView } from '../../shared/in-view/in-view';

@Component({
  selector: 'portfolio-footer',
  imports: [InView],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  protected readonly currentYear: number = new Date().getFullYear();
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly footerContent: Signal<FooterContent> = this.contentProvider.getFooterContent();
}
