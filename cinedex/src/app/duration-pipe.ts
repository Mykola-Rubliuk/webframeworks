import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (minutes == null || !Number.isFinite(minutes) || minutes <= 0) {
      return '?';
    }

    const total = Math.round(minutes);
    const hours = Math.floor(total / 60);
    const mins = total % 60;

    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  }
}
