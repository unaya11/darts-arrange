export const dialog = document.querySelector<HTMLDialogElement>('dialog');
export const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
export const closeButton = document.querySelector<HTMLDialogElement>('#closeDialog');
export const resultElement = document.getElementById('dialogBox');
export const errorDisplay = document.querySelector('#errorMessage')!;
export const checks = document.querySelectorAll<HTMLInputElement>('.third-checks');
export const checkAll = document.querySelector<HTMLInputElement>('.checkAlls');

export function openDialog(targetScore: number, score: string[]) {
  // メッセージ表示を初期化する
  errorDisplay.textContent = '';
  createView(score, targetScore);
  dialog?.showModal();
}

export function closeDialog() {
  if (dialog) {
    dialog.close();
  }
}

export function toggleAllChecks() {
  const isChecked = !!checkAll?.checked;
  checks.forEach((check) => {
    check.checked = isChecked;
  });
}

export function createView(calcScoreList: string[], inputNumber: number) {
  if (!resultElement) return;
  const title = document.getElementById('dialogTitle');
  if (title) {
    title.textContent = inputNumber + ' のアレンジ';
  }
  resultElement.innerHTML = '';

  calcScoreList.forEach((scoreText) => {
    const p = document.createElement('p');
    p.textContent = scoreText;
    resultElement.appendChild(p);
  });
}

export function createErrorMessage(error: unknown) {
  if (error instanceof Error) {
    errorDisplay.textContent = error.message;
  }
}
