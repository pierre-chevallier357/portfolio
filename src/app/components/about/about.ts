import { NgOptimizedImage } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
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
