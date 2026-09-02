import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { InView } from '../../shared/in-view/in-view';
import { ContentProvider } from '../../content/content-provider';
import { ContactContent } from '../../content/contact-content';
import { LanguageStore } from '../../core/language/language-store';

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
  private readonly contentProvider: ContentProvider = inject(ContentProvider);
  protected readonly title: Signal<string> = this.contentProvider.getSectionTitle('contact');
  protected readonly contactContent: Signal<ContactContent> =
    this.contentProvider.getContactContent();
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly resumeUrl: Signal<string> = computed(
    () => `resume/resume-${this.languageStore.language()?.code ?? 'en'}.pdf`,
  );
  protected readonly resumeFileName: Signal<string> = computed(
    () => `Pierre-Chevallier-CV-${this.languageStore.language()?.code ?? 'en'}.pdf`,
  );
  private copyResetTimeoutId: ReturnType<typeof setTimeout> | null = null;

  protected async copyEmail(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    try {
      await navigator.clipboard.writeText(this.contactContent().email);
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
