import { describe, it, expect } from 'vitest';
import { leftNumbers } from '../../constants/darts';

describe('Darts Constants のバリデーション', () => {
  it('leftNumbers（上がり目）はすべて偶数であること', () => {
    // 50以外のすべての数字が2で割り切れるかチェック
    const isAllEvenOrBull = leftNumbers.every((num) => num % 2 === 0);
    expect(isAllEvenOrBull).toBe(true);
  });
});
