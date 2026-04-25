import {
  allNumbers,
  bull,
  EvaluatedRoute,
  notBogyNumbers,
  scoringNumbers2,
  singleNumbers,
} from '@/constants/darts';
import { NoResultError } from '@/constants/error';

export function calcScore(
  targetScore: number,
  firstThrowList: number[],
  thirdThrowList: number[],
): EvaluatedRoute[] {
  if (targetScore <= 170) {
    return under170(targetScore, firstThrowList, thirdThrowList);
  } else {
    return over171(targetScore);
  }
}

function under170(
  targetScore: number,
  firstThrowList: number[],
  thirdThrowList: number[],
): string[] {
  const resultList: string[] = [];
  // 1投目と3投目は決まっているので2本目に必要なスコアを出す
  for (const firstThrow of firstThrowList) {
    // 2本で削るスコアを計算する
    for (const thirdThrow of thirdThrowList) {
      // 入力値から1、3本目を引いて2本目で削るスコアを出す
      const secondThrow = targetScore - firstThrow - thirdThrow;
      // 存在すれば結果に追加する
      if (allNumbers.includes(secondThrow)) {
        resultList.push(`${firstThrow}-${secondThrow}-${thirdThrow}`);
      }
    }
  }
  if (resultList.length === 0) {
    throw new NoResultError();
  }
  // 重複を排除するためSetに収めた後、配列に戻す
  const set = new Set(resultList);
  return Array.from(set);
}

// TODO PR環境で動かすため
function over171(targetScore: number): EvaluatedRoute[] {
  const resultList: EvaluatedRoute[] = [];
  const luckyNumbers = new Set<number>();
  const baseNumbers = scoringNumbers2.filter((num) => !bull.includes(num));

  for (const first of baseNumbers) {
    for (const second of baseNumbers) {
      for (const third of scoringNumbers2) {
        const result = first + second + third;
        const remainScore = targetScore - result;

        if (remainScore <= 170) {
          if (notBogyNumbers.includes(remainScore)) {
            if (singleNumbers.includes(first)) {
              luckyNumbers.add(first);
            }
            resultList.push({
              route: `${first}-${second}-${third}`,
              score: 0,
              nextTarget: remainScore,
            });
          }
        }
      }
    }
  }
  // TODO PR環境で動かすため
  const strategySet = new Set([...luckyNumbers].flatMap((num) => [num, num * 3]));
  resultList.forEach((item) => {
    item.score = evaluateArrangementQuality(item, targetScore, strategySet);
  });
  resultList.sort((a, b) => b.score - a.score);
  console.log(resultList);
  // 重複は排除せずに返す
  return resultList;
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
// TODO PR環境で動かすため
function evaluateArrangementQuality(
  item: EvaluatedRoute,
  targetScore: number,
  luckyNumbers: Set<number>,
): number {
  let currentScore = 0;
  // 文字列 "19-57-57" を [19, 57, 57] という数字の配列に戻す
  const [first, second, third] = item.route.split('-').map(Number);
  // 1,2本目が同じエリアか
  if (second % first === 0 && second / first <= 3) {
    currentScore += 1;
  }
  // 同じ数字を連続して打てるか
  if (first % second === 0 || second % third === 0) {
    currentScore += 1;
  }
  // BULLを打つ必要があるか
  if (bull.includes(third)) {
    currentScore -= 1;
  }
  // シングルが使えるルートか
  if (luckyNumbers.has(first)) {
    currentScore += 11111;
  }
  return currentScore;
}
