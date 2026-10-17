import type { Task } from './task.model';

export type ProjectStatus = 'En attente' | 'En cours' | 'Terminé';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  budget: number;
  tasks: Task[];
}