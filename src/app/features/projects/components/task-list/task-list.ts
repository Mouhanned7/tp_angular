import { Component, computed, input, output, signal } from '@angular/core';
import type { Task, TaskStatus } from '../../models/task.model';
import { TaskItem } from '../task-item/task-item';

export type TaskStatusFilter = 'all' | 'inProgress' | 'done';

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
  taskDelete = output<{ taskId: number }>();

  // Filtre des tâches (Partie 7 - Bonus 2)
  taskFilter = signal<TaskStatusFilter>('all');

  filteredTasks = computed(() => {
    const list = this.tasks();
    switch (this.taskFilter()) {
      case 'inProgress':
        return list.filter(t => t.status === 'En cours');
      case 'done':
        return list.filter(t => t.status === 'Terminé');
      case 'all':
      default:
        return list;
    }
  });

  onItemStatusChange(taskId: number, newStatus: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, newStatus });
  }

  onItemDelete(taskId: number): void {
    this.taskDelete.emit({ taskId });
  }
}
