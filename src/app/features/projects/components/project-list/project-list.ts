import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProjectService } from '../../../../core/services/project.service';
import type { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  searchTerm = signal('');
  selectedProject = signal<Project | null>(null);

  filteredProjects = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.projects().filter(project =>
      project.name.toLowerCase().includes(search)
    );
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  onProjectSelected(project: Project): void {
    this.selectedProject.set(project);
    console.log(project);
  }
}
