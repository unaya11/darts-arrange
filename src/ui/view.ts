export const dialog = document.querySelector<HTMLDialogElement>('dialog');
export const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
export const closeButton = document.querySelector<HTMLDialogElement>('#closeDialog');
export const resultElement = document.getElementById('dialogBox');
export const errorDisplay = document.querySelector('#errorMessage');
export const checks = document.querySelectorAll<HTMLInputElement>('.checks');
export const checkAll = document.querySelector<HTMLInputElement>('.checkAlls');

export function openDialog(leftNumber: number, score: number[]) {
  if (dialog) {
    if (errorDisplay) {
      errorDisplay.textContent = '';
    }
    if (leftNumber === undefined) {
      return;
    }

    if (score.length === 0) {
      {
        if (errorDisplay) {
          errorDisplay.textContent = '選択した条件での上がり目が存在しません';
          return;
        }
      }
    }
    createView(score, leftNumber);
    dialog?.showModal();
  }
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

export function createView(calcScoreList: number[], inputNumber: number) {
  if (!resultElement) return;
  const title = document.getElementById('dialogTitle');
  if (title) {
    title.textContent = inputNumber + ' のアレンジ';
  }
  resultElement.innerHTML = '';

  for (let i = 0; i < calcScoreList.length; i += 3) {
    const chunk = calcScoreList.slice(i, i + 3);
    const p = document.createElement('p');
    p.textContent = chunk.join(' - ');
    resultElement.appendChild(p);
  }
}

export function nullView() {
  if (errorDisplay) {
    errorDisplay.textContent = '数字を入力してください';
  }
}
