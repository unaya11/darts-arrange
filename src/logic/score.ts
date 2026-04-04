import * as ScoreItems from '../ui/view';
import * as darts from '../constants/darts';

export function calcScore(inputnumber: number): number[] {
  // 一投目が指定されている場合はその値とそのシングルを対象とし、指定されていない場合はすべてを対象とする
  const selectFirstNumbers = getSelectNumbers('input[type=checkbox]:checked.first-checks');
  const firstNumberList = selectFirstNumbers
    ? addSingleNumberThrowList(selectFirstNumbers)
    : darts.allNumbers;

  // 三投目が指定されている場合はその値を、指定されていない場合はすべてのダブルを対象とする
  const leftNumberList =
    getSelectNumbers('input[type=checkbox]:checked.checks') ?? darts.leftNumbers;

  const resultList: string[] = [];

  const targetScore = getInputNumber();
  for (const first of firstNumberList) {
    for (const second of darts.allNumbers) {
      if (targetScore != undefined) {
        const requiredThird = targetScore - (first + second);
        if (leftNumberList.includes(requiredThird)) {
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
function addSingleNumberThrowList(score: number[]): number[] {
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

// チェックボックスの状態を取得し、選択された数字を配列で返す
// 未指定の場合はnullを返す
function getSelectNumbers(selector: string): number[] | null {
  const getSelectNumbers = document.querySelectorAll<HTMLInputElement>(selector);
  if (getSelectNumbers.length === 0) {
    return null;
  }
  const values: number[] = [];
  getSelectNumbers.forEach((node) => {
    values.push(Number(node.value));
  });
  return values;
}

export function getInputNumber(): number | undefined {
  const el = document.querySelector<HTMLInputElement>('#numberInput')?.valueAsNumber;
  if (el === undefined || Number.isNaN(el)) {
    return undefined;
  }
  return el;
}
