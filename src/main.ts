import './styles/main.css';
import * as view from './ui/view';
import * as darts from './constants/darts';
import { addSingleNumberThrowList, calcScore } from './logic/score';
import { getInputNumber, getSelectNumbers } from './ui/dartsInputReader';
view.checkAll?.addEventListener('click', () => {
  view.toggleAllChecks();
});

view.showButton?.addEventListener('click', () => {
  // 一投目が指定されている場合はその値とそのシングルを対象とし、指定されていない場合はすべてを対象とする
  const selectFirstNumbers = getSelectNumbers('input[type=checkbox]:checked.first-checks');
  const firstThrowList = selectFirstNumbers
    ? addSingleNumberThrowList(selectFirstNumbers)
    : darts.allNumbers;

  // 三投目が指定されている場合はその値を、指定されていない場合はすべてのダブルを対象とする
  const selectThirdNumbers = getSelectNumbers('input[type=checkbox]:checked.checks');
  const thirdThrowList = selectThirdNumbers ?? darts.leftNumbers;

  const targetScore = getInputNumber();
  if (targetScore === undefined) {
    view.nullView();
    return;
  }
  const calcScoreList = calcScore(targetScore, firstThrowList, thirdThrowList);
  view.openDialog(targetScore, calcScoreList);
});

view.closeButton?.addEventListener('click', () => {
  view.closeDialog();
});
