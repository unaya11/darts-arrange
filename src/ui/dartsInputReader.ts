import { NoInputNumberError } from '@/constants/error';

// チェックボックスの状態を取得し、選択された数字を配列で返す
// 未指定の場合はundefinedを返す
export function getSelectNumbers(selector: string): number[] | undefined {
  const getSelectNumbers = document.querySelectorAll<HTMLInputElement>(selector);
  if (getSelectNumbers.length === 0) {
    return undefined;
  }
  const values: number[] = [];
  getSelectNumbers.forEach((node) => {
    values.push(Number(node.value));
  });
  return values;
}

export function getInputNumber(): number {
  const el = document.querySelector<HTMLInputElement>('#numberInput')?.valueAsNumber;
  if (el === undefined || Number.isNaN(el)) {
    throw new NoInputNumberError();
  }
  return el;
}
