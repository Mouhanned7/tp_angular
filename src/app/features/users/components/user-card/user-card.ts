import { Component, computed, input } from '@angular/core';
import type { User } from '../../models/user.model';
import type { Project } from '../../../projects/models/project.model';
import type { Task } from '../../../projects/models/task.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { UserProjectGroup } from '../user-project-group/user-project-group';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [EmptyState, UserProjectGroup],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

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