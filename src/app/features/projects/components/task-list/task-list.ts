import { Component, input } from '@angular/core';
import type { Task } from '../../models/task.model';
import { USERS } from '../../../users/data/users.data';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
})
export class TaskList {
  
  tasks = input.required<Task[]>();
  showAssignee = input(true);

  getUserName(assigneeId: number): string {
    return USERS.find(user => user.id === assigneeId)?.name ?? 'Utilisateur inconnu';
  }
}
