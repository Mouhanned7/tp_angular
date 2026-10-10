import { Component, input } from '@angular/core';
import type { Task } from '../../../projects/models/task.model';
import { TaskList } from '../../../projects/components/task-list/task-list';

@Component({
  imports: [TaskList],
  selector: 'app-user-project-group',
  styleUrl: './user-project-group.css',
  
  templateUrl: './user-project-group.html',
})
export class UserProjectGroup {
  projectName = input.required<string>();
  tasks = input.required<Task[]>();
}
