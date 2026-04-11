import { allNumbers } from '@/constants/darts';
import { NoResultError } from '@/constants/error';
import { addSingleNumberThrowList, calcScore } from '@/logic/score';

describe('calcScoreのテスト', () => {
  it('resultListが空ではない場合、例外が投げられないこと', () => {
    expect(() => {
      calcScore(170, [60], [50]);
    }).not.toThrow(NoResultError);
  });
  it('resultListが空の場合、例外が投げられること', () => {
    expect(() => {
      calcScore(999, [10], [10]);
    }).toThrow(NoResultError);
  });
  it('1投目と2投目が入れ替わる（3投目は同じ）パターンの場合、どちらもresultListに追加されること', () => {
    const resultList = calcScore(167, [60, 57], [50]);
    expect(resultList).toHaveLength(2);
  });
  it('1投目と2投目が同じパターンの場合、重複してresultListに追加されないこと', () => {
    const resultList = calcScore(170, [60, 60], [50]);
    expect(resultList).toHaveLength(1);
  });
  it('resultListに入っている中身を足した結果、targetScoreと一致すること', () => {
    const targetScore = 100;
    const resultList = calcScore(targetScore, allNumbers, allNumbers);
    expect(resultList.length).toBeGreaterThan(0);

    resultList.forEach((result) => {
      const [f, s, t] = result.split('-').map(Number);
      expect(f + s + t).toBe(targetScore);
    });
  });
});

describe('addSingleNumberThrowListのテスト', () => {
  it('3で割り切れる数字の場合、元の数字と3で割った数字が含まれること', () => {
    const actual = addSingleNumberThrowList([60]);
    expect(actual).toStrictEqual([60, 20]);
  });
  it('3で割り切れない数字の場合、元の数字のみ含まれること', () => {
    const actual = addSingleNumberThrowList([10]);
    expect(actual).toStrictEqual([10]);
  });
  it('インナーBull(50)の場合、アウターBull(25)が含まれること', () => {
    const actual = addSingleNumberThrowList([50]);
    expect(actual).toStrictEqual([50, 25]);
  });
  it('複数指定されている場合、全てのトリプルとシングルが算出されること', () => {
    const actual = addSingleNumberThrowList([60, 57]);
    expect(actual).toEqual(expect.arrayContaining([60, 20, 57, 19]));
  });
  it('元の配列が変更（破壊）されないこと', () => {
    const input = [60];
    addSingleNumberThrowList(input);
    expect(input).toStrictEqual([60]);
  });
});
