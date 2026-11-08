import { Component, input } from '@angular/core';

export interface StatBadgeItem {
  label: string;
  count: number;
  color?: 'blue' | 'red' | 'amber' | 'green' | 'slate';
}

@Component({
  selector: 'app-stat-badge-group',
  standalone: true,
  templateUrl: './stat-badge-group.html',
})
export class StatBadgeGroup {
  title = input<string>();
  badges = input.required<StatBadgeItem[]>();
  totalText = input<string>();

  getBadgeStyles(color?: string): { background: string; border: string; color: string } {
    switch (color) {
      case 'red':
        return {
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#b91c1c',
        };
      case 'amber':
        return {
          background: '#fffbeb',
          border: '1px solid #fde68a',
          color: '#b45309',
        };
      case 'blue':
        return {
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          color: '#0284c7',
        };
      case 'green':
        return {
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          color: '#15803d',
        };
      case 'slate':
      default:
        return {
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          color: '#475569',
        };
    }
  }
}
