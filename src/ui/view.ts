export const dialog = document.querySelector<HTMLDialogElement>('dialog');
export const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
export const resultElement = document.getElementById('dialogBox');
export const errorDisplay = document.querySelector('#errorMessage');
export const checks = document.querySelectorAll<HTMLInputElement>('.checks');
export const checkAll = document.querySelector<HTMLInputElement>('.checkAlls');
export const closeButton = document.querySelector<HTMLDialogElement>('#closeDialog');

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
  if (!resultElement) return;
  const title = document.getElementById('dialogTitle');
  if (title) {
    title.textContent = getInputNumber()?.value + ' のアレンジ';
  }
  resultElement.innerHTML = '';

  for (let i = 0; i < calcScoreList.length; i += 3) {
    const chunk = calcScoreList.slice(i, i + 3);
    const p = document.createElement('p');
    p.textContent = chunk.join(' - ');
    resultElement.appendChild(p);
  }
}

export function openDialog(score: number[]) {
  if (dialog) {
    if (errorDisplay) {
      errorDisplay.textContent = '';
    }
    if (getInputNumber() === undefined) {
      return;
    }

    if (score.length === 0) {
      {
        if (errorDisplay) {
          errorDisplay.textContent = '選択した3本目での上がり目が存在しません';
          return;
        }
      }
    }
    createView(score);
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
