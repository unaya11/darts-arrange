import './styles/main.css';
const dialog = document.querySelector<HTMLDialogElement>('dialog');
const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
const resultElement = document.getElementById('dialogBox');
const errorDisplay = document.querySelector('#errorMessage');
const inputNumber = () => {
  const el = document.querySelector<HTMLInputElement>('#numberInput');
  if (!el || el.value === '') {
    if (errorDisplay) {
      errorDisplay.textContent = '数字を入力してください';
    }
    return;
  }
  return el;
};

const singleNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
const dobuleNumbers = Array.from({ length: 20 }, (_, i) => (i + 1) * 2);
const tripleNumbers = Array.from({ length: 20 }, (_, i) => (i + 1) * 3);
const leftNumbers = [...dobuleNumbers, 50];
const bull = [25, 50];
const allScores = [...singleNumbers, ...dobuleNumbers, ...tripleNumbers, ...bull];

showButton?.addEventListener('click', () => {
  const calcScoreList = calcScore();
  if (dialog) {
    if (errorDisplay) {
      errorDisplay.textContent = '';
    }
    if (inputNumber() === undefined) {
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
    title.textContent = inputNumber()?.value + ' のアレンジ';
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
  const selectLeftNumberList = getCheckBoxValues();
  const leftList: number[] = [];
  for (const first of allScores) {
    for (const second of allScores) {
      for (const third of leftNumbers) {
        if (isTarget(third, selectLeftNumberList)) {
          const score = first + second + third;
          if (inputNumber()?.valueAsNumber === score) {
            leftList.push(first, second, third);
          }
        }
      }
    }
  }
  return leftList;
}

// チェックボックスの状態を取得
function getCheckBoxValues(): string[] {
  const selectLeftNumber = document.querySelectorAll<HTMLInputElement>(
    'input[type=checkbox]:checked',
  );
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
