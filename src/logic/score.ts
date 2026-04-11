import { allNumbers } from '@/constants/darts';
import { NoResultError } from '@/constants/error';

export function calcScore(
  targetScore: number,
  firstThrowList: number[],
  thirdThrowList: number[],
): string[] {
  const resultList: string[] = [];

  // 1投目と3投目は決まっているので2本目に必要なスコアを出す
  for (const firstThrow of firstThrowList) {
    // 2本で削るスコアを計算する
    thirdThrowList.forEach((thirdThrow) => {
      // 入力値から1、3本目を引いて2本目で削るスコアを出す
      const secondThrow = targetScore - firstThrow - thirdThrow;

      // 存在すれば結果に追加する
      if (allNumbers.includes(secondThrow)) {
        resultList.push(`${firstThrow}-${secondThrow}-${thirdThrow}`);
      }
    });
  }
  if (resultList.length === 0) {
    throw new NoResultError();
  }
  // 重複を排除するためSetに収めた後、配列に戻す
  const set = new Set(resultList);
  return Array.from(set);
}

// 一投目の指定がされた場合、外した場合も考慮してシングルもリストに追加する
export function addSingleNumberThrowList(score: number[]): number[] {
  const firstThrowList = [...score];
  score.forEach((num) => {
    if (num % 3 === 0) {
      firstThrowList.push(num / 3);
    }
  });
  if (score.includes(50)) {
    firstThrowList.push(25);
  }
  return firstThrowList;
}
