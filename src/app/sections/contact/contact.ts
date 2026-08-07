import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { TextProvider } from '../../content/text-provider';
import { ContactContent } from '../../content/contact-content';

@Component({
  selector: 'portfolio-contact',
  imports: [InView],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  protected readonly copied: WritableSignal<boolean> = signal(false);
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private readonly textProvider: TextProvider = inject(TextProvider);
  protected readonly title: Signal<string> = this.textProvider.getNavLinkText('contact');
  protected readonly contact: Signal<ContactContent> = this.textProvider.getContactContent();
  private copyResetTimeoutId: ReturnType<typeof setTimeout> | null = null;

  protected async copyEmail(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    try {
      await navigator.clipboard.writeText(this.contact().email);
      this.showCopiedInfoForTwoSeconds();
    } catch {
      // Clipboard access can fail (missing permissions, insecure context); fail silently.
    }
  }

  private showCopiedInfoForTwoSeconds(): void {
    this.copied.set(true);
    if (this.copyResetTimeoutId) {
      clearTimeout(this.copyResetTimeoutId);
    }
    this.copyResetTimeoutId = setTimeout(() => this.copied.set(false), 2000);
  }
}
