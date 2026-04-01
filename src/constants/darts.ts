export const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
export const bull = [50, 25];
export const leftNumbers = [...numbers.flatMap((num) => [num * 2]), 50];

// 結果を降順に表示するため、reverseする
// reverse()はtoReversed()は元の配列の中身を変更しない
export const allNumbers = [
  ...numbers.toReversed().flatMap((num) => [num * 3, num * 2, num]),
  ...bull,
];
