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
  WritableSignal
} from '@angular/core';
import { Experience } from '../../../content/experience-content';
import { Timeline } from '../timeline/timeline';
import { MissionItem } from '../mission-item/mission-item';

@Component({
  selector: 'portfolio-experience-item',
  imports: [Timeline, MissionItem],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.scss',
})
export class ExperienceItem {
  public readonly experience: InputSignal<Experience> = input.required<Experience>();
  protected readonly missionItems: Signal<readonly MissionItem[]> = viewChildren(MissionItem);
  protected readonly missionsContainer: Signal<ElementRef<HTMLElement>> =
    viewChild.required<ElementRef<HTMLElement>>('missionsContainer');
  private readonly missionsContainerHeight: WritableSignal<number> = signal(0);
  private readonly firstMetaInfoHeight: WritableSignal<number> = signal(0);
  protected readonly timelineStartingPosition: Signal<number> = computed(
    () => this.firstMetaInfoHeight() / 2,
  );
  private readonly metaInfoCenters: WritableSignal<number[]> = signal([]);
  protected readonly dotPositions: Signal<number[]> = computed(() => {
    const top: number = this.timelineStartingPosition();
    const height: number = this.timelineHeight();
    if (height <= 0) {
      return this.metaInfoCenters().map(() => 0);
    }
    return this.metaInfoCenters().map((center) => ((center - top) / height) * 100);
  });
  private readonly isSingleMission: Signal<boolean> = computed(
    () => this.experience().missions.length === 1,
  );
  protected readonly timelineHeight: Signal<number> = computed(() =>
    this.isSingleMission()
      ? this.missionsContainerHeight() - this.firstMetaInfoHeight() / 2
      : this.missionsContainerHeight() - this.firstMetaInfoHeight(),
  );

  constructor() {
    afterRenderEffect((onCleanup) => {
      const container: ElementRef<HTMLElement> | undefined = this.missionsContainer();
      const metaElements: HTMLElement[] = this.missionItems()
        .map((entry) => entry.metaInfoElement()?.nativeElement)
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
      this.firstMetaInfoHeight.set(metaElements[0].offsetHeight);
      this.metaInfoCenters.set(
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
