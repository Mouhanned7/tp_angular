import { Component, input, output } from '@angular/core';
import type { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TaskList],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();

  projectSelected = output<Project>();

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
