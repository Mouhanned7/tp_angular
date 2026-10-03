import { Component } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectList],
  templateUrl: './app.html',
})
export class App {}
