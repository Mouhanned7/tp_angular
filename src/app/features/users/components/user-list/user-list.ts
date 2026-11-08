import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import { ProjectService } from '../../../../core/services/project.service';
import type { User } from '../../models/user.model';
import type { Project } from '../../../projects/models/project.model';
import type { TaskStatus } from '../../../projects/models/task.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, EmptyState, UserCard],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly projectService = inject(ProjectService);

  searchTerm = input<string>('');
  users = signal<User[]>([]);
  projects = signal<Project[]>([]);

  filteredUsers = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.users().filter(user =>
      `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search)
    );
  });

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users.set(users));
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
  }

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus }): void {
    this.projects.update(projects =>
      projects.map(project => ({
        ...project,
        tasks: project.tasks.map(task =>
          task.id === event.taskId ? { ...task, status: event.newStatus } : task
        ),
      }))
    );
    this.projectService.updateTaskStatus(event.taskId, event.newStatus);
  }

  onTaskDelete(event: { taskId: number }): void {
    this.projects.update(projects =>
      projects.map(project => ({
        ...project,
        tasks: project.tasks.filter(task => task.id !== event.taskId),
      }))
    );
    this.projectService.deleteTask(event.taskId);
  }
}
