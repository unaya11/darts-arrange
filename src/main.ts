import './styles/main.css';
import { calcScore } from './logic/score';
import * as ScoreItems from './ui/view';

ScoreItems.checkAll?.addEventListener('click', () => {
  const isChecked = !!ScoreItems.checkAll?.checked;
  ScoreItems.checks.forEach((check) => {
    check.checked = isChecked;
  });
});

ScoreItems.showButton?.addEventListener('click', () => {
  const calcScoreList = calcScore();
  if (ScoreItems.dialog) {
    if (ScoreItems.errorDisplay) {
      ScoreItems.errorDisplay.textContent = '';
    }
    if (ScoreItems.getInputNumber() === undefined) {
      return;
    }

    if (calcScoreList.length === 0) {
      {
        if (ScoreItems.errorDisplay) {
          ScoreItems.errorDisplay.textContent = '選択した3本目での上がり目が存在しません';
          return;
        }
      }
    }
    ScoreItems.createView(calcScoreList);
    ScoreItems.dialog.showModal();
  }
});

const closeButton = document.querySelector<HTMLDialogElement>('#closeDialog');
closeButton?.addEventListener('click', () => {
  if (ScoreItems.dialog) {
    ScoreItems.dialog.close();
  }
});
