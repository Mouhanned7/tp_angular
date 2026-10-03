import type { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Site e-commerce',
    description: 'Créer une boutique en ligne.',
    status: 'En cours',
    tasks: [
      {
        id: 1,
        title: 'Créer la page des produits',
        priority: 'Haute',
        status: 'En cours',
      },
      {
        id: 2,
        title: 'Ajouter le panier',
        priority: 'Moyenne',
        status: 'En attente',
      },
    ],
  },
  {
    id: 2,
    name: 'Portfolio',
    description: 'Présenter mes projets personnels.',
    status: 'Terminé',
    tasks: [
      {
        id: 3,
        title: 'Créer la page de présentation',
        priority: 'Basse',
        status: 'Terminé',
      },
    ],
  },
  {
    id: 3,
    name: 'Application mobile',
    description: 'Organiser les tâches quotidiennes.',
    status: 'En attente',
    tasks: [],
  },
];