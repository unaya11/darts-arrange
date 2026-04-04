import './styles/main.css';
import * as view from './ui/view';
import { calcScore } from './logic/score';
import { getInputNumber } from './logic/score';

view.checkAll?.addEventListener('click', () => {
  view.toggleAllChecks();
});

view.showButton?.addEventListener('click', () => {
  const leftNumber = getInputNumber();
  if (leftNumber === undefined) {
    view.nullView();
    return;
  }
  const calcScoreList = calcScore(leftNumber);
  view.openDialog(leftNumber, calcScoreList);
});

view.closeButton?.addEventListener('click', () => {
  view.closeDialog();
});
