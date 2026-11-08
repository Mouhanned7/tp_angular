import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import type { Project } from '../../features/projects/models/project.model';
import type { TaskStatus } from '../../features/projects/models/task.model';
import { PROJECTS } from '../../features/projects/data/projects.data';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    const project = PROJECTS.find((project) => project.id === id);
    return of(project);
  }

  updateTaskStatus(taskId: number, newStatus: TaskStatus): void {
    for (const project of PROJECTS) {
      const task = project.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = newStatus;
        break;
      }
    }
  }

  deleteTask(taskId: number): void {
    for (const project of PROJECTS) {
      const idx = project.tasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) {
        project.tasks.splice(idx, 1);
        break;
      }
    }
  }
}
