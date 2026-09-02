import {
  Component,
  computed,
  ElementRef,
  inject,
  output,
  OutputEmitterRef,
  Signal,
  viewChild,
} from '@angular/core';
import { LanguageStore } from '../../../core/language/language-store';
import { Language } from '../../../core/language/language';

@Component({
  selector: 'portfolio-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  public readonly clicked: OutputEmitterRef<void> = output<void>();
  protected readonly popover: Signal<ElementRef<HTMLDivElement> | undefined> =
    viewChild<ElementRef<HTMLDivElement>>('popover');
  private readonly languageStore: LanguageStore = inject(LanguageStore);
  protected readonly language: Signal<Language> = this.languageStore.language.asReadonly();
  protected readonly ariaLabel: Signal<string> = computed(() =>
    this.language()?.code === 'fr' ? 'Changer de langue' : 'Change language',
  );
  protected readonly languages: Language[] = this.languageStore.languages;

  protected selectLanguage(language: Language): void {
    this.languageStore.setLanguage(language);
    this.popover()?.nativeElement.hidePopover();
    this.clicked.emit();
  }
}
