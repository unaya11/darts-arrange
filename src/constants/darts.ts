const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
export const bull = [50, 25];
export const leftNumbers = [...numbers.flatMap((num) => [num * 2]), 50];
export const scoringNumbers = [...numbers.flatMap((num) => [num, num * 3]), ...bull];
export const scoringNumbers2 = [60, 57, 54, 20, 19, 18, 17, ...bull];

// TODO PR環境で動かすため
export const singleNumbers = numbers;
export type EvaluatedRoute = {
  route: number[];
  score: number;
  nextTarget: number;
};

// 170以下で上がり目の無い数字
export const bogyNumbers = [169, 168, 166, 165, 163, 162, 159];
// 上がり目を
export const notBogyNumbers = [170, 167, 164];
// 結果を降順に表示するため、reverseする
// reverse()と違いtoReversed()は元の配列の中身を変更しない
export const allNumbers = [
  ...numbers.toReversed().flatMap((num) => [num * 3, num * 2, num]),
  ...bull,
];
