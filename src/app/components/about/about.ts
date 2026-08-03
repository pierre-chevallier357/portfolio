import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { InView } from '../../directives/in-view/in-view';

@Component({
  selector: 'about',
  imports: [NgOptimizedImage, InView],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly isInView: WritableSignal<boolean> = signal(false);
  protected readonly age: number = this.calculateAge(new Date('2000-10-20'));
  private readonly http: HttpClient = inject(HttpClient);
  private readonly rawParagraphs: Signal<string[]> = toSignal(
    this.http.get<string[]>('data/about.json'),
    { initialValue: [] },
  );
  protected readonly paragraphs: Signal<string[]> = computed(() =>
    this.rawParagraphs().map((paragraph) => paragraph.replace('{{age}}', `${this.age}`)),
  );

  private calculateAge(birthDate: Date): number {
    const today: Date = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
