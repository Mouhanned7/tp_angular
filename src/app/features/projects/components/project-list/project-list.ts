import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProjectService } from '../../../../core/services/project.service';
import type { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';
  import type { TaskStatus } from '../../models/task.model';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  searchTerm = input<string>('');
  selectedProject = signal<Project | null>(null);

  filteredProjects = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.projects().filter(project =>
      project.name.toLowerCase().includes(search)
    );
  });


// Dans la classe ProjectList :
onTaskStatusChange(event: { projectId: number; taskId: number; newStatus: TaskStatus }): void {
  this.projects.update(projects =>
    projects.map(project => {
      // Si ce n'est pas le projet concerné, on le retourne tel quel
      if (project.id !== event.projectId) {
        return project;
      }

      // On crée un nouvel objet projet avec une nouvelle liste de tâches
      return {
        ...project,
        tasks: project.tasks.map(task => {
          if (task.id !== event.taskId) {
            return task;
          }
          // On crée une nouvelle tâche avec le nouveau statut
          return {
            ...task,
            status: event.newStatus,
          };
        }),
      };
    })
  );
  this.projectService.updateTaskStatus(event.taskId, event.newStatus);
}

onTaskDelete(event: { projectId: number; taskId: number }): void {
  this.projects.update(projects =>
    projects.map(project => {
      if (project.id !== event.projectId) {
        return project;
      }
      return {
        ...project,
        tasks: project.tasks.filter(task => task.id !== event.taskId),
      };
    })
  );
  this.projectService.deleteTask(event.taskId);
}

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
