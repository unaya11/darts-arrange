import { allNumbers } from '../constants/darts';
import { NoLeftNuberError } from '../constants/error';

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
      // jjj
      const secondThrow = targetScore - firstThrow - thirdThrow;

      // 全ての数字の中に存在すれば結果に追加する
      if (allNumbers.includes(secondThrow)) {
        resultList.push(`${firstThrow}-${secondThrow}-${thirdThrow}`);
      }
    });
  }

  if (resultList.length === 0) {
    throw new NoLeftNuberError();
  }
  // 重複を排除するためSetに収めた後、配列に戻す
  const set = new Set(resultList);
  return Array.from(set);
}

// 選択された上がり目と三投目のスコアが一致するかを確認
function isTarget(thirdScore: number, getCheckBoxValues: number[]): boolean {
  if (getCheckBoxValues.length === 0) {
    return true;
  }
  return getCheckBoxValues.includes(thirdScore);
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
