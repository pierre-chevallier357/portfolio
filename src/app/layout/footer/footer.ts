import { Component, inject, Signal } from '@angular/core';
import { TextProvider } from '../../content/text-provider';
import { FooterContent } from '../../content/footer-content';

@Component({
  selector: 'portfolio-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly textProvider: TextProvider = inject(TextProvider);
  protected readonly content: Signal<FooterContent> = this.textProvider.getFooterContent();
  protected readonly currentYear: number = new Date().getFullYear();
}
