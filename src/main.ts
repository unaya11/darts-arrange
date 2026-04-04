import './styles/main.css';
import * as view from './ui/view';
import * as darts from './constants/darts';
import * as reader from './ui/dartsInputReader';
import { calcScore } from './logic/score';
import { addSingleNumberThrowList } from './logic/score';
import { getInputNumber } from './ui/dartsInputReader';

view.checkAll?.addEventListener('click', () => {
  view.toggleAllChecks();
});

view.showButton?.addEventListener('click', () => {
  // 一投目が指定されている場合はその値とそのシングルを対象とし、指定されていない場合はすべてを対象とする
  const selectFirstNumbers = reader.getSelectNumbers('input[type=checkbox]:checked.first-checks');
  const firstThrowList = selectFirstNumbers
    ? addSingleNumberThrowList(selectFirstNumbers)
    : darts.allNumbers;

  // 三投目が指定されている場合はその値を、指定されていない場合はすべてのダブルを対象とする
  const thirdThrowList =
    reader.getSelectNumbers('input[type=checkbox]:checked.checks') ?? darts.leftNumbers;

  const leftNumber = getInputNumber();
  if (leftNumber === undefined) {
    view.nullView();
    return;
  }
  const calcScoreList = calcScore(leftNumber, firstThrowList, thirdThrowList);
  view.openDialog(leftNumber, calcScoreList);
});

view.closeButton?.addEventListener('click', () => {
  view.closeDialog();
});
