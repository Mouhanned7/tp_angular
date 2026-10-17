import { Component, input } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import type { Task, TaskStatus } from '../../models/task.model';
import { USERS } from '../../../users/data/users.data';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, NgClass, TruncatePipe, DeadlinePipe, HighlightDirective],
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input(true);

  getUserName(assigneeId?: number): string {
    if (!assigneeId) {
      return 'Non assigné';
    }
    return (
      USERS.find(user => user.id === assigneeId)?.name ?? 'Utilisateur inconnu'
    );
  }

  getStatusBorderClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'border-l-4 border-l-emerald-500';
      case 'En cours':
        return 'border-l-4 border-l-blue-500';
      case 'En attente':
      default:
        return 'border-l-4 border-l-amber-500';
    }
  }

  getStatusBorderColor(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return '#10b981';
      case 'En cours':
        return '#3b82f6';
      case 'En attente':
      default:
        return '#f59e0b';
    }
  }
}
