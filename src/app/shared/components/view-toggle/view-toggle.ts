import { Component, input, output } from '@angular/core';

export type AppView = 'tasks' | 'users';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  view = input.required<AppView>();
  viewChange = output<AppView>();
}