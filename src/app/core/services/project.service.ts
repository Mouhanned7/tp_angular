import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import type { Project } from '../../features/projects/models/project.model';
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
}