import { Injectable } from '@angular/core';
import {
  concat,
  concatMap,
  delay,
  from,
  ignoreElements,
  interval,
  map,
  Observable,
  of,
  repeat,
  take,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Typewriter {
  public getTypewriterEffect(words: string[]): Observable<string> {
    return from(words).pipe(
      concatMap((word) => this.typeAndEraseEffect(word)),
      repeat()
    );
  }

  private typeAndEraseEffect(word: string): Observable<string> {
    return concat(
      this.type(word, 60),
      of('').pipe(delay(2000), ignoreElements()),
      this.type(word, 30, true),
      of('').pipe(delay(300), ignoreElements())
    );
  }

  private type(word: string, speed: number, isBackwards = false): Observable<string> {
    return interval(speed).pipe(
      map((x) => (isBackwards ? word.substring(0, word.length - x) : word.substring(0, x + 1))),
      take(word.length + 1)
    );
  }
}
