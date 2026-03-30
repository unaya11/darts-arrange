import * as ScoreItems from '../ui/view';

export const dialog = document.querySelector<HTMLDialogElement>('dialog');
export const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
export const resultElement = document.getElementById('dialogBox');
export const errorDisplay = document.querySelector('#errorMessage');
export const checks = document.querySelectorAll<HTMLInputElement>('.checks');
export const checkAll = document.querySelector<HTMLInputElement>('.checkAlls');

export const getInputNumber = () => {
  const el = document.querySelector<HTMLInputElement>('#numberInput');
  if (!el || el.value === '') {
    if (errorDisplay) {
      errorDisplay.textContent = '数字を入力してください';
    }
    return;
  }
  return el;
};

export function createView(calcScoreList: number[]) {
  if (!ScoreItems.resultElement) return;
  const title = document.getElementById('dialogTitle');
  if (title) {
    title.textContent = ScoreItems.getInputNumber()?.value + ' のアレンジ';
  }
  ScoreItems.resultElement.innerHTML = '';

  for (let i = 0; i < calcScoreList.length; i += 3) {
    const chunk = calcScoreList.slice(i, i + 3);
    const p = document.createElement('p');
    p.textContent = chunk.join(' - ');
    ScoreItems.resultElement.appendChild(p);
  }
}
