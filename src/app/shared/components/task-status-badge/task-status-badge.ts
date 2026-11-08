import { Component, input } from '@angular/core';
import type { TaskStatus } from '../../../features/projects/models/task.model';

@Component({
  selector: 'app-task-status-badge',
  standalone: true,
  template: `
    <span
      [style.backgroundColor]="statusStyles[status()].bg"
      [style.borderColor]="statusStyles[status()].border"
      [style.color]="statusStyles[status()].text"
      style="display: inline-flex; align-items: center; padding: 0.2rem 0.6rem; border: 1px solid; border-radius: 4px; font-size: 0.8rem; font-weight: 600; line-height: 1.3;"
    >
      {{ status() }}
    </span>
  `,
})
export class TaskStatusBadge {
  status = input.required<TaskStatus>();

  readonly statusStyles: Record<TaskStatus, { bg: string; border: string; text: string }> = {
    'Terminé': { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
    'En cours': { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
    'En attente': { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
  };
}
