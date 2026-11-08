import { Component, input, output } from '@angular/core';
import type { Task, TaskStatus } from '../../../projects/models/task.model';
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

  taskStatusChange = output<{ taskId: number; newStatus: TaskStatus }>();
  taskDelete = output<{ taskId: number }>();

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus }): void {
    this.taskStatusChange.emit(event);
  }

  onTaskDelete(event: { taskId: number }): void {
    this.taskDelete.emit(event);
  }
}
