/*
  ダーツボードの基本定義(1-20,BULL)
*/
export const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);
export const BULL = [50, 25];

/*
  削り・アレンジ用の配列
*/
export const scoringNumbers = [...NUMBERS.flatMap((num) => [num, num * 3]), ...BULL];
export const highRangeScoringNumbers = [60, 57, 54, 20, 19, 18, 17, ...BULL];
export const highRangeNonBullNumbers = highRangeScoringNumbers.filter((num) => !BULL.includes(num));
export const middleRangePriorityNumbers = [20, 19, 18, 17];
export const middleRangeTargetNumbers = [20, 19, 18, 17, 25];

/*
  上り用の配列
*/
export const leftNumbers = [...NUMBERS.flatMap((num) => [num * 2]), 50];

// 170以下で上がり目の無い数字
export const bogeyNumbers = [169, 168, 166, 165, 163, 162, 159];
// 上がり目
export const checkOutNumbers = [170, 167, 164];
// 結果を降順に表示するため、reverseする
// reverse()と違いtoReversed()は元の配列の中身を変更しない
export const allNumbers = [
  ...NUMBERS.toReversed().flatMap((num) => [num * 3, num * 2, num]),
  ...BULL,
];
export type EvaluatedRoute = {
  route: number[];
  score: number;
  nextTarget: number;
};
