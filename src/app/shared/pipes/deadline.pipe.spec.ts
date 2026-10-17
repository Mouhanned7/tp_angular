import { describe, it, expect } from 'vitest';
import { DeadlinePipe } from './deadline.pipe';

describe('DeadlinePipe', () => {
  const pipe = new DeadlinePipe();

  function formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  it('should return "Pas d’échéance" when value is null or empty', () => {
    expect(pipe.transform(null)).toBe('Pas d’échéance');
    expect(pipe.transform(undefined)).toBe('Pas d’échéance');
    expect(pipe.transform('')).toBe('Pas d’échéance');
  });

  it('should return "Aujourd’hui" for today', () => {
    const today = new Date();
    expect(pipe.transform(formatDate(today))).toBe('Aujourd’hui');
  });

  it('should return "Demain" for tomorrow', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(pipe.transform(formatDate(tomorrow))).toBe('Demain');
  });

  it('should return "Dans n jours" for future dates > 1 day', () => {
    const future = new Date();
    future.setDate(future.getDate() + 5);
    expect(pipe.transform(formatDate(future))).toBe('Dans 5 jours');
  });

  it('should return "En retard de 1 jour" for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(pipe.transform(formatDate(yesterday))).toBe('En retard de 1 jour');
  });

  it('should return "En retard de n jours" for past dates > 1 day', () => {
    const past = new Date();
    past.setDate(past.getDate() - 5);
    expect(pipe.transform(formatDate(past))).toBe('En retard de 5 jours');
  });
});

