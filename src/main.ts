import './styles/main.css';
const dialog = document.querySelector<HTMLDialogElement>('dialog');
const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
const resultElement = document.getElementById('dialogBox');
const errorDisplay = document.querySelector('#errorMessage');
const checks = document.querySelectorAll<HTMLInputElement>('.checks');
const checkall = document.querySelector<HTMLInputElement>('.checkAlls');

const getInputNumber = () => {
  const el = document.querySelector<HTMLInputElement>('#numberInput');
  if (!el || el.value === '') {
    if (errorDisplay) {
      errorDisplay.textContent = '数字を入力してください';
    }
    return;
  }
  return el;
};

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
const bull = [25, 50];
const leftNumbers = [...numbers.flatMap((num) => [num * 2]), 50];
// 結果を降順に表示するため、reverseする。reverse()が元の配列を反転させるためslice()でコピーする
const allNumbers = [
  ...numbers
    .slice()
    .reverse()
    .flatMap((num) => [num * 3, num * 2, num]),
  ...bull,
];

checkall?.addEventListener('click', () => {
  const isChecked = checkall.checked;
  checks.forEach((check) => {
    check.checked = isChecked;
  });
});

showButton?.addEventListener('click', () => {
  const calcScoreList = calcScore();
  if (dialog) {
    if (errorDisplay) {
      errorDisplay.textContent = '';
    }
    if (getInputNumber() === undefined) {
      return;
    }

    if (calcScoreList.length === 0) {
      {
        if (errorDisplay) {
          errorDisplay.textContent = '選択した3本目での上がり目が存在しません';
          return;
        }
      }
    }
    createView(calcScoreList);
    dialog.showModal();
  }
});

const closeButton = document.querySelector<HTMLDialogElement>('#closeDialog');
closeButton?.addEventListener('click', () => {
  if (dialog) {
    dialog.close();
  }
});

function createView(calcScoreList: number[]) {
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

function calcScore(): number[] {
  const selectLeftNumber = document.querySelectorAll<HTMLInputElement>(
    'input[type=checkbox]:checked.checks',
  );
  const selectLeftNumberList = getSelectedItems(selectLeftNumber);

  const selectFirstNumber = document.querySelectorAll<HTMLInputElement>(
    'input[type=checkbox]:checked.first-checks',
  );
  const selectFirstNumberList = getSelectedItems(selectFirstNumber);

  const leftList: number[] = [];
  for (const first of allNumbers) {
    if (!selectFirstNumberList.includes(first.toString())) {
      continue;
    }
    for (const second of allNumbers) {
      for (const third of leftNumbers) {
        if (isTarget(third, selectLeftNumberList)) {
          const score = first + second + third;
          if (getInputNumber()?.valueAsNumber === score) {
            leftList.push(first, second, third);
          }
        }
      }
    }
  }
  return leftList;
}

// チェックボックスの状態を取得
function getSelectedItems(selectLeftNumber: NodeListOf<HTMLInputElement>): string[] {
  const values: string[] = [];
  selectLeftNumber.forEach((node) => {
    values.push(node.value);
  });
  return values;
}

// 3本目が選択されたスコアかどうかを確認
function isTarget(thirdScore: number, getCheckBoxValues: string[]): boolean {
  if (getCheckBoxValues.length === 0) {
    return true;
  }
  return getCheckBoxValues.includes(thirdScore.toString());
}
