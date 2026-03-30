export const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
export const bull = [25, 50];
export const leftNumbers = [...numbers.flatMap((num) => [num * 2]), 50];

// 結果を降順に表示するため、reverseする
// reverse()が元の配列を反転させるためslice()でコピーする
export const allNumbers = [
  ...numbers
    .slice()
    .reverse()
    .flatMap((num) => [num * 3, num * 2, num]),
  ...bull,
];
