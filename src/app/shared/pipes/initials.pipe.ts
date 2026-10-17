import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value || !value.trim()) {
      return '?';
    }

    const words = value.trim().split(/\s+/).filter(Boolean).slice(0, 2);
    if (words.length === 0) {
      return '?';
    }

    return words.map(w => w.charAt(0).toUpperCase()).join('');
  }
}

