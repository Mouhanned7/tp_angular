// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// import type { Project } from '../../features/projects/models/project.model';
// import { PROJECTS } from '../../features/projects/data/projects.data';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProjectService {
//   getProjects(): Observable<Project[]> {
//     return of(PROJECTS);
//   }
// }


import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../../features/users/models/user.model';
import { USERS } from '../../features/users/data/users.data';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  getUserById(id: number): Observable<User | undefined> {
    const user = USERS.find((user: User) => user.id === id);
    return of(user);
  }
}
