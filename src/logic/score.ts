import * as ScoreItems from '../ui/view';
import * as darts from '../constants/darts';

export function calcScore(): number[] {
  const selectLeftNumber = document.querySelectorAll<HTMLInputElement>(
    'input[type=checkbox]:checked.checks',
  );
  const selectLeftNumberList = getSelectedItems(selectLeftNumber);
  const LeftNumberList = selectLeftNumberList.length > 0 ? selectLeftNumberList : darts.leftNumbers;

  const selectFirstNumber = document.querySelectorAll<HTMLInputElement>(
    'input[type=checkbox]:checked.first-checks',
  );
  const selectFirstNumberList = getSelectedItems(selectFirstNumber);

  const leftList: string[] = [];
  const firstList: number[] = [];

  if (selectFirstNumberList.length === 0) {
    // チェックボックスが選択されていない場合は全ての数字を対象とする
    firstList.push(...darts.allNumbers);
  } else {
    // 選択されている場合はその数字のみを対象とする
    firstList.push(...createFirstThrowList(selectFirstNumberList));
  }

  const targetScore = ScoreItems.getInputNumber()?.valueAsNumber;
  for (const first of firstList) {
    for (const second of darts.allNumbers) {
      if (targetScore != undefined) {
        const requiredThird = targetScore - (first + second);
        if (LeftNumberList.includes(requiredThird)) {
          leftList.push(`${first},${second},${requiredThird}`);
        }
      }
    }
  }
  const uniqueLeftList = new Set(leftList);
  const finalResult = [...uniqueLeftList].flatMap((item) => item.split(',').map(Number));
  return finalResult;
}

// 選択された上がり目と3本目のスコアが一致するかを確認
function isTarget(thirdScore: number, getCheckBoxValues: number[]): boolean {
  if (getCheckBoxValues.length === 0) {
    return true;
  }
  return getCheckBoxValues.includes(thirdScore);
}

// 1本目の指定がされた場合、外した場合も考慮してシングルもリストに追加する
function createFirstThrowList(score: number[]): number[] {
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
function getSelectedItems(selectLeftNumber: NodeListOf<HTMLInputElement>): number[] {
  const values: number[] = [];
  selectLeftNumber.forEach((node) => {
    values.push(Number(node.value));
  });
  return values;
}
