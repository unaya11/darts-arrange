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
  const firstList: number[] = [];

  if (selectFirstNumberList.length === 0) {
    // チェックボックスが選択されていない場合は全ての数字を対象とする
    firstList.push(...allNumbers);
  } else {
    // 選択されている場合は、選択された数字のみを対象とする
    addFirst(selectFirstNumberList);
    firstList.push(...selectFirstNumberList.map(Number));
  }

  for (const first of firstList) {
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
function getSelectedItems(selectLeftNumber: NodeListOf<HTMLInputElement>): number[] {
  const values: number[] = [];
  selectLeftNumber.forEach((node) => {
    values.push(Number(node.value));
  });
  return values;
}

// 3本目が選択されたスコアかどうかを確認
function isTarget(thirdScore: number, getCheckBoxValues: number[]): boolean {
  if (getCheckBoxValues.length === 0) {
    return true;
  }
  return getCheckBoxValues.includes(thirdScore);
}

// 1本目の指定がチェックされた場合、シングルも追加する
function addFirst(score: number[]): number[] {
  score.forEach((num) => {
    if (num % 3 === 0) {
      score.push(num / 3);
    }
  });
  if (score.includes(50)) {
    score.push(25);
  }
  return score;
}
