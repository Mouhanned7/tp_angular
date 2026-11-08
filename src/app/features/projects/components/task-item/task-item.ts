import { Component, input, output } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import type { Task, TaskStatus } from '../../models/task.model';
import { USERS } from '../../../users/data/users.data';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { TaskStatusBadge } from '../../../../shared/components/task-status-badge/task-status-badge';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    TruncatePipe,
    DeadlinePipe,
    HighlightDirective,
    TaskStatusBadge,
  ],
  templateUrl: './task-item.html',
})
export class TaskItem {
  // Entrées (Inputs)
  task = input.required<Task>();
  showAssignee = input<boolean>(true);

  // Sorties (Outputs)
  taskStatusChange = output<TaskStatus>();
  taskDelete = output<number>();

  // Récupérer le nom de l'utilisateur
  getUserName(assigneeId?: number): string {
    if (!assigneeId) return 'Non assigné';
    return USERS.find(u => u.id === assigneeId)?.name ?? 'Utilisateur inconnu';
  }

  // Cycle du statut : En attente -> En cours -> Terminé -> En attente
  onNextStatus(): void {
    const current = this.task().status;
    let next: TaskStatus;

    if (current === 'En attente') {
      next = 'En cours';
    } else if (current === 'En cours') {
      next = 'Terminé';
    } else {
      next = 'En attente';
    }

    this.taskStatusChange.emit(next);
  }

  onDelete(): void {
    this.taskDelete.emit(this.task().id);
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
}
