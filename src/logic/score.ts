import {
  allNumbers,
  baseNumbers,
  bogyNumbers,
  bull,
  EvaluatedRoute,
  notBogyNumbers,
  numbers1,
  scoringNumbers2,
  scoringNumbers3,
  singleNumbers,
} from '@/constants/darts';
import { NoResultError } from '@/constants/error';

export function calcScore(
  targetScore: number,
  firstThrowList: number[],
  thirdThrowList: number[],
): EvaluatedRoute[] {
  if (targetScore <= 170) {
    return calcCheckoutScore(targetScore, firstThrowList, thirdThrowList);
  }
  if (targetScore <= 235) {
    return generateAndRankRoutes(targetScore, scoringNumbers3, numbers1);
  }
  return generateAndRankRoutes(targetScore, baseNumbers, scoringNumbers2);
}

function generateAndRankRoutes(
  targetScore: number,
  firstThrowList: number[],
  thirdThrowList: number[],
): EvaluatedRoute[] {
  const luckyNumbers = new Set<number>();
  const resultList: EvaluatedRoute[] = [];
  for (const first of firstThrowList) {
    for (const second of firstThrowList) {
      for (const third of thirdThrowList) {
        const remainScore = targetScore - first - second - third;

        // 3本目がブルの場合、残りスコアがnotBogyNumbersにならない場合はスキップ
        if (bull.includes(third) && !notBogyNumbers.includes(remainScore)) {
          continue;
        }
        if (remainScore <= 170 && !bogyNumbers.includes(remainScore)) {
          if (singleNumbers.includes(first)) {
            luckyNumbers.add(first);
          }
          resultList.push({
            route: [first, second, third],
            score: 0,
            nextTarget: remainScore,
          });
        }
      }
    }
  }
  const duplicatesList = removeDuplicatesList(resultList);
  duplicatesList.forEach((item) => {
    item.score = evaluateArrangementQuality(item, luckyNumbers);
  });
  duplicatesList.sort((a, b) => b.score - a.score);
  // 重複は排除せずに返す
  if (resultList.length === 0) {
    throw new NoResultError();
  }
  return duplicatesList;
}

function calcCheckoutScore(
  targetScore: number,
  firstThrowList: number[],
  thirdThrowList: number[],
): EvaluatedRoute[] {
  const resultSet = new Set<string>();
  // 1投目と3投目は決まっているので2本目に必要なスコアを出す
  for (const firstThrow of firstThrowList) {
    // 2本で削るスコアを計算する
    for (const thirdThrow of thirdThrowList) {
      // 入力値から1、3本目を引いて2本目で削るスコアを出す
      const secondThrow = targetScore - firstThrow - thirdThrow;
      // 存在すれば結果に追加する
      if (allNumbers.includes(secondThrow)) {
        resultSet.add(`${firstThrow}-${secondThrow}-${thirdThrow}`);
      }
    }
  }
  if (resultSet.size === 0) {
    throw new NoResultError();
  }
  return Array.from(resultSet).map((item) => {
    const parts = item.split('-').map(Number);
    return {
      route: [parts[0], parts[1], parts[2]],
      score: 0,
      nextTarget: 0,
    };
  });
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

function evaluateArrangementQuality(item: EvaluatedRoute, luckyNumbers: Set<number>): number {
  let currentScore = 0;

  const [first, second, third] = item.route;
  // 1,2本目が同じエリアか
  if (second % first === 0 && second / first <= 3) {
    currentScore += 1;
  }
  // シングルが使えるルートか
  if (luckyNumbers.has(first)) {
    currentScore += 10;
  }
  // BULLを打つ必要があるか
  if (bull.includes(third)) {
    currentScore += 5;
  }
  const strategySet = new Set([...luckyNumbers].flatMap((num) => [num, num * 3]));

  if (strategySet.has(first)) {
    currentScore += 1;
  }
  if (isSameArea(item.route)) {
    currentScore += 4;
  }
  return currentScore;
}

// 3本全て同じエリアに投げているか判定する
function isSameArea(numbers: number[]): boolean {
  const reverseSingleNumbers = singleNumbers.toReversed();
  for (const i of reverseSingleNumbers) {
    const isCheck = numbers.every((number) => {
      return number % i === 0 && number / i <= 3;
    });
    if (isCheck) {
      return true;
    }
  }
  return false;
}

// リスト内の残りスコアと2,3本目の組み合わせが同じものを削除
function removeDuplicatesList(resultList: EvaluatedRoute[]): EvaluatedRoute[] {
  const map = new Map<string, EvaluatedRoute>();
  resultList.forEach((item) => {
    const [a, b, c] = item.route;
    const normalizedBC = [b, c].sort((x, y) => x - y);
    const key = `${a}-${normalizedBC[0]}-${normalizedBC[1]}-${item.nextTarget}`;
    if (!map.has(key)) {
      map.set(key, item);
    }
  });

  return Array.from(map.values());
}
