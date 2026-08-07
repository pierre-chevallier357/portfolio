import { Component, inject, Signal } from '@angular/core';
import { ContentProvider } from '../../content/content-provider';
import { FooterContent } from '../../content/footer-content';

@Component({
  selector: 'portfolio-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly currentYear: number = new Date().getFullYear();
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly footerContent: Signal<FooterContent> = this.contentProvider.getFooterContent();
}
