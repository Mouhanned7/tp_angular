import { Component, input } from '@angular/core';
import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
}
