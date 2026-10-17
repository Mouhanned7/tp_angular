import { describe, it, expect } from 'vitest';
import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  const pipe = new InitialsPipe();

  it('should return uppercase initials of the first two words', () => {
    expect(pipe.transform('Amira Ben Salah')).toBe('AB');
  });

  it('should return initial for single word', () => {
    expect(pipe.transform('karim')).toBe('K');
  });

  it('should return ? for absent or empty values', () => {
    expect(pipe.transform(null)).toBe('?');
    expect(pipe.transform(undefined)).toBe('?');
    expect(pipe.transform('')).toBe('?');
    expect(pipe.transform('   ')).toBe('?');
  });
});

