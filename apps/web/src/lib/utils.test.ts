import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names and drops nullish and false values', () => {
    expect(cn('p-2', undefined, null, false, 'text-sm')).toBe('p-2 text-sm');
  });

  it('lets the last conflicting Tailwind class win', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
