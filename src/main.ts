import './styles/main.css';
const dialog = document.querySelector<HTMLDialogElement>('dialog');
const showButton = document.querySelector<HTMLDialogElement>('#showDialog');
const inputNumber = document.querySelector<HTMLInputElement>('#numberInput');
const resultElement = document.getElementById('dialogBox');

const singleNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
const dobuleNumbers = Array.from({ length: 20 }, (_, i) => (i + 1) * 2);
const tripleNumbers = Array.from({ length: 20 }, (_, i) => (i + 1) * 3);
const leftNumbers = [...dobuleNumbers, 50];
const bull = [25, 50];
const allScores = [...singleNumbers, ...dobuleNumbers, ...tripleNumbers, ...bull];

showButton?.addEventListener('click', () => {
  if (dialog) {
    calcScore();
    dialog.showModal();
  }
});

const closeButton = document.querySelector<HTMLDialogElement>('#closeDialog');
closeButton?.addEventListener('click', () => {
  if (dialog) {
    dialog.close();
  }
});

function calcScore() {
  if (!resultElement) return;
  const title = document.getElementById('dialogTitle');
  if (title) {
    title.textContent = inputNumber?.value + ' のアレンジ';
  }
  resultElement.innerHTML = '';

  const list: number[] = [];
  for (const first of allScores) {
    for (const second of allScores) {
      for (const third of leftNumbers) {
        const score = first + second + third;
        if (inputNumber?.valueAsNumber == score) {
          list.push(first, second, third);
        }
      }
    }
  }

  const viewList: number[][] = [];
  for (let i = 0; i < list.length; i += 3) {
    const chunk = list.slice(i, i + 3);
    const p = document.createElement('p');
    p.textContent = chunk.join(' - ');
    resultElement.appendChild(p);
  }
}

function checkScore() {}
