import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { AppView, ViewToggle } from './shared/components/view-toggle/view-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ProjectList, UserList, ViewToggle],
  templateUrl: './app.html',
})
export class App {
  view = signal<AppView>('tasks');
  searchTerm = signal('');

  onViewChange(newView: AppView): void {
    this.view.set(newView);
  }
}
