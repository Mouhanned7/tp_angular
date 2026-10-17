import { describe, it, expect } from 'vitest';
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should truncate string longer than limit with default suffix', () => {
    const text = 'Créer les maquettes haute fidélité de la page d’accueil pour validation par le client avant l’intégration.';
    const result = pipe.transform(text, 40);
    expect(result.length).toBeLessThanOrEqual(41); // 40 or trimmed + suffix
    expect(result.endsWith('…')).toBe(true);
  });

  it('should not truncate short text', () => {
    const text = 'Tester l’affichage sur mobile et tablette.';
    expect(pipe.transform(text, 50)).toBe(text);
  });

  it('should return empty string for null, undefined, or empty', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should trim trailing spaces before adding suffix', () => {
    const text = 'Hello world this is a test';
    expect(pipe.transform(text, 12, '...')).toBe('Hello world...');
  });
});

