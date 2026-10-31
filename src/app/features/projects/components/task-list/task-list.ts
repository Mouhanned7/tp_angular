import { Component, input, output } from '@angular/core';
import type { Task, TaskStatus } from '../../models/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem],
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);

  taskStatusChange = output<{ taskId: number; newStatus: TaskStatus }>();

  onItemStatusChange(taskId: number, newStatus: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, newStatus });
  }
}
