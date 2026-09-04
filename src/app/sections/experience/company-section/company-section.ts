import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  input,
  InputSignal,
  Signal,
  signal,
  viewChild,
  viewChildren,
  WritableSignal,
} from '@angular/core';
import {ExperienceEntry} from '../../../content/experience-content';
import {Timeline} from '../timeline/timeline';
import {TimelineEntry} from '../timeline-entry/timeline-entry';

@Component({
  selector: 'portfolio-company-section',
  imports: [Timeline, TimelineEntry],
  templateUrl: './company-section.html',
  styleUrl: './company-section.scss',
})
export class CompanySection {
  public readonly company: InputSignal<ExperienceEntry> = input.required<ExperienceEntry>();
  protected readonly missionEntries: Signal<readonly TimelineEntry[]> = viewChildren(TimelineEntry);
  protected readonly missionsContainer: Signal<ElementRef<HTMLElement>> =
    viewChild.required<ElementRef<HTMLElement>>('missionsContainer');
  private readonly missionsContainerHeight: WritableSignal<number> = signal(0);
  private readonly firstMetaHeight: WritableSignal<number> = signal(0);
  protected readonly timelineStartingPosition: Signal<number> = computed(
    () => this.firstMetaHeight() / 2,
  );
  private readonly metaCenters: WritableSignal<number[]> = signal([]);
  protected readonly dotPositions: Signal<number[]> = computed(() => {
    const top: number = this.timelineStartingPosition();
    const height: number = this.timelineHeight();
    if (height <= 0) {
      return this.metaCenters().map(() => 0);
    }
    return this.metaCenters().map((center) => ((center - top) / height) * 100);
  });
  private readonly isSingleMission: Signal<boolean> = computed(
    () => this.company().missions.length === 1,
  );
  protected readonly timelineHeight: Signal<number> = computed(() =>
    this.isSingleMission()
      ? this.missionsContainerHeight() - this.firstMetaHeight() / 2
      : this.missionsContainerHeight() - this.firstMetaHeight(),
  );

  constructor() {
    afterRenderEffect((onCleanup) => {
      const container: ElementRef<HTMLElement> | undefined = this.missionsContainer();
      const metaElements: HTMLElement[] = this.missionEntries()
        .map((entry) => entry.metaElement()?.nativeElement)
        .filter((meta): meta is HTMLElement => !!meta);
      if (!container || metaElements.length === 0) {
        return;
      }
      this.observeMeasurements(container.nativeElement, metaElements, onCleanup);
    });
  }

  private observeMeasurements(
    container: HTMLElement,
    metaElements: HTMLElement[],
    onCleanup: (cleanupFn: () => void) => void,
  ): void {
    const updateMeasurements = () => {
      const containerTop: number = container.getBoundingClientRect().top;
      this.missionsContainerHeight.set(container.offsetHeight);
      this.firstMetaHeight.set(metaElements[0].offsetHeight);
      this.metaCenters.set(
        metaElements.map((meta) => {
          const metaRect: DOMRect = meta.getBoundingClientRect();
          return metaRect.top - containerTop + metaRect.height / 2;
        }),
      );
    };
    updateMeasurements();
    const resizeObserver: ResizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });
    resizeObserver.observe(container);
    metaElements.forEach((meta) => resizeObserver.observe(meta));
    window.addEventListener('resize', updateMeasurements);

    onCleanup(() => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    });
  }
}
