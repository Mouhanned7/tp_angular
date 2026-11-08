import { Component, computed, input, output } from '@angular/core';
import type { TaskStatus } from '../../models/task.model';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgStyle,
  PercentPipe,
} from '@angular/common';
import type { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import {
  StatBadgeGroup,
  StatBadgeItem,
} from '../../../../shared/components/stat-badge-group/stat-badge-group';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    TaskList,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    NgStyle,
    HighlightDirective,
    StatBadgeGroup,
  ],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();

  projectSelected = output<Project>();

  taskStatusChange = output<{ projectId: number; taskId: number; newStatus: TaskStatus }>();
  taskDelete = output<{ projectId: number; taskId: number }>();

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus }): void {
    this.taskStatusChange.emit({
      projectId: this.project().id,
      taskId: event.taskId,
      newStatus: event.newStatus,
    });
  }

  onTaskDelete(event: { taskId: number }): void {
    this.taskDelete.emit({
      projectId: this.project().id,
      taskId: event.taskId,
    });
  }

  // Calcul réactif du nombre de tâches terminées
  completedTasksCount = computed(() => {
    return this.project().tasks.filter(t => t.status === 'Terminé').length;
  });

  // Calcul réactif du taux d'avancement
  completionRate = computed(() => {
    const total = this.project().tasks.length;
    return total > 0 ? this.completedTasksCount() / total : 0;
  });

  get averageCostPerTask(): number {
    const tasks = this.project().tasks;
    if (!tasks || tasks.length === 0) {
      return 0;
    }
    return this.project().budget / tasks.length;
  }

  get tasksByPriority(): Record<string, number> {
    const counts: Record<string, number> = {
      Basse: 0,
      Haute: 0,
      Moyenne: 0,
    };
    for (const task of this.project().tasks) {
      if (counts[task.priority] !== undefined) {
        counts[task.priority]++;
      } else {
        counts[task.priority] = 1;
      }
    }
    return counts;
  }

  priorityBadges = computed<StatBadgeItem[]>(() => {
    const counts = this.tasksByPriority;
    return [
      { label: 'Basse', count: counts['Basse'] ?? 0, color: 'blue' },
      { label: 'Haute', count: counts['Haute'] ?? 0, color: 'red' },
      { label: 'Moyenne', count: counts['Moyenne'] ?? 0, color: 'amber' },
    ];
  });

  get barColor(): string {
    const rate = this.completionRate();
    if (rate < 0.34) {
      return '#ef4444';
    }
    if (rate <= 0.66) {
      return '#f59e0b';
    }
    return '#10b981';
  }
}
