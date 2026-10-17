import { Component, computed, input } from '@angular/core';
import {
  LowerCasePipe,
  NgClass,
  NgStyle,
  TitleCasePipe,
} from '@angular/common';
import type { User } from '../../models/user.model';
import type { Project } from '../../../projects/models/project.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    EmptyState,
    UserProjectGroup,
    TitleCasePipe,
    LowerCasePipe,
    InitialsPipe,
    NgClass,
    NgStyle,
    HighlightDirective,
  ],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  readonly roleColors: Record<string, string> = {
    'Développeur': '#3b82f6',
    'Designer': '#ec4899',
    'Chef de projet': '#8b5cf6',
    'Testeur': '#10b981',
  };

  get roleColor(): string {
    return this.roleColors[this.user().role] ?? '#64748b';
  }

  get statusBadgeClass(): string {
    return this.user().active
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-gray-100 text-gray-600';
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

  projectGroups = computed(() =>
    this.projects()
      .map(project => ({
        projectName: project.name,
        tasks: project.tasks.filter(task => task.assigneeId === this.user().id),
      }))
      .filter(group => group.tasks.length > 0)
  );
}