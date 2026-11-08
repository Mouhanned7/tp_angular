import { Component, computed, input, output } from '@angular/core';
import {
  LowerCasePipe,
  NgStyle,
  TitleCasePipe,
} from '@angular/common';
import type { User } from '../../models/user.model';
import type { Project } from '../../../projects/models/project.model';
import type { TaskStatus } from '../../../projects/models/task.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import {
  StatBadgeGroup,
  StatBadgeItem,
} from '../../../../shared/components/stat-badge-group/stat-badge-group';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    EmptyState,
    UserProjectGroup,
    TitleCasePipe,
    LowerCasePipe,
    InitialsPipe,
    NgStyle,
    HighlightDirective,
    StatBadgeGroup,
  ],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  taskStatusChange = output<{ taskId: number; newStatus: TaskStatus }>();
  taskDelete = output<{ taskId: number }>();

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus }): void {
    this.taskStatusChange.emit(event);
  }

  onTaskDelete(event: { taskId: number }): void {
    this.taskDelete.emit(event);
  }

  readonly roleColors: Record<string, string> = {
    'Développeur': '#2563eb',
    'Designer': '#7c3aed',
    'Chef de projet': '#0f766e',
    'Testeur': '#059669',
  };

  get roleColor(): string {
    return this.roleColors[this.user().role] ?? '#475569';
  }

  tasks = computed(() =>
    this.projects()
      .flatMap(project => project.tasks)
      .filter(task => task.assigneeId === this.user().id)
  );

  todoCount = computed(() =>
    this.tasks().filter(task => task.status === 'En attente').length
  );

  inProgressCount = computed(() =>
    this.tasks().filter(task => task.status === 'En cours').length
  );

  doneCount = computed(() =>
    this.tasks().filter(task => task.status === 'Terminé').length
  );

  taskStatBadges = computed<StatBadgeItem[]>(() => [
    { label: 'À faire', count: this.todoCount(), color: 'amber' },
    { label: 'En cours', count: this.inProgressCount(), color: 'blue' },
    { label: 'Terminées', count: this.doneCount(), color: 'green' },
  ]);

  projectGroups = computed(() =>
    this.projects()
      .map(project => ({
        projectName: project.name,
        tasks: project.tasks.filter(task => task.assigneeId === this.user().id),
      }))
      .filter(group => group.tasks.length > 0)
  );
}
