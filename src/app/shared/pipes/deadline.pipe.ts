import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline',
  standalone: true,
})
export class DeadlinePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) {
      return 'Pas d’échéance';
    }

    let targetDate: Date;
    if (typeof value === 'string') {
      const parts = value.split('-');
      if (parts.length === 3) {
        targetDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      } else {
        targetDate = new Date(value);
      }
    } else {
      targetDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    if (isNaN(targetDate.getTime())) {
      return 'Pas d’échéance';
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffMs = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Aujourd’hui';
    }

    if (diffDays === 1) {
      return 'Demain';
    }

    if (diffDays > 1) {
      return `Dans ${diffDays} jours`;
    }

    const daysLate = Math.abs(diffDays);
    if (daysLate === 1) {
      return 'En retard de 1 jour';
    }

    return `En retard de ${daysLate} jours`;
  }
}

