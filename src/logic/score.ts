import * as darts from '../constants/darts';

export function calcScore(
  inputnumber: number,
  firstThrowList: number[],
  thirdThrowList: number[],
): number[] {
  const resultList: string[] = [];

  const targetScore = inputnumber;
  for (const first of firstThrowList) {
    for (const second of darts.allNumbers) {
      if (targetScore != undefined) {
        const requiredThird = targetScore - (first + second);
        if (thirdThrowList.includes(requiredThird)) {
          resultList.push(`${first},${second},${requiredThird}`);
        }
      }
    }
  }
  const uniqueLeftList = new Set(resultList);
  const finalResult = [...uniqueLeftList].flatMap((item) => item.split(',').map(Number));
  return finalResult;
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
