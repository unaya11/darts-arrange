export const dialog = document.querySelector<HTMLDialogElement>('dialog');
export const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
export const closeButton = document.querySelector<HTMLDialogElement>('#closeDialog');
export const resultElement = document.getElementById('dialogBox');
export const errorDisplay = document.querySelector('#errorMessage')!;
export const thirdChecks = document.querySelectorAll<HTMLInputElement>('.third-checks');
export const firstChecks = document.querySelectorAll<HTMLInputElement>('.first-checks');
export const checkAllsThird = document.querySelector<HTMLInputElement>('.checkAllsThird');
export const checkAllsFirst = document.querySelector<HTMLInputElement>('.checkAllsFirst');
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

export function toggleAllChecks(element: HTMLInputElement, targets: NodeListOf<HTMLInputElement>) {
  const isChecked = element.checked;
  targets.forEach((check) => {
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
    // TODO PR環境で動かすため
    if (scoreText.route !== undefined) {
      p.textContent = `${scoreText.route}, ${scoreText.nextTarget}`;
      resultElement.appendChild(p);
    } else {
      p.textContent = scoreText;
      resultElement.appendChild(p);
    }
  });
}

export function createErrorMessage(error: unknown) {
  if (error instanceof Error) {
    errorDisplay.textContent = error.message;
  }
}
