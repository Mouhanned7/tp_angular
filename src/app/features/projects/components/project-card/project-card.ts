import { Component, computed, input, output } from '@angular/core';
import type { TaskStatus } from '../../models/task.model';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  KeyValuePipe,
  NgStyle,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import type { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    TaskList,
    UpperCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    SlicePipe,
    KeyValuePipe,
    NgStyle,
    HighlightDirective,
  ],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();

  projectSelected = output<Project>();

  taskStatusChange = output<{ projectId: number; taskId: number; newStatus: TaskStatus }>();

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

  get barColor(): string {
    const rate = this.completionRate();
    if (rate < 0.34) {
      return '#ef4444';
    }
    if (rate <= 0.66) {
      return '#f59e0b';
    }
    return '#22c55e';
  }
}