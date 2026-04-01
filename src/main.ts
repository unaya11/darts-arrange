import './styles/main.css';
import * as view from './ui/view';
import { calcScore } from './logic/score';

view.checkAll?.addEventListener('click', () => {
  view.toggleAllChecks();
});

view.showButton?.addEventListener('click', () => {
  const calcScoreList = calcScore();
  view.openDialog(calcScoreList);
});

view.closeButton?.addEventListener('click', () => {
  view.closeDialog();
});
