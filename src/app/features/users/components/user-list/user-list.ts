import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import { ProjectService } from '../../../../core/services/project.service';
import type { User } from '../../models/user.model';
import type { Project } from '../../../projects/models/project.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, EmptyState, UserCard],
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly projectService = inject(ProjectService);

  users = signal<User[]>([]);
  projects = signal<Project[]>([]);
  searchTerm = signal('');

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
}