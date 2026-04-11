import './styles/main.css';
import { allNumbers, leftNumbers } from './constants/darts';
import { addSingleNumberThrowList, calcScore } from './logic/score';
import { getInputNumber, getSelectNumbers } from './ui/dartsInputReader';
import {
  checkAll,
  closeButton,
  closeDialog,
  createErrorMessage,
  openDialog,
  showButton,
  toggleAllChecks,
} from './ui/view';

checkAll?.addEventListener('click', () => {
  toggleAllChecks();
});

showButton?.addEventListener('click', () => {
  // 一投目が指定されている場合はその値とそのシングルを対象とし、指定されていない場合はすべてを対象とする
  const selectFirstNumbers = getSelectNumbers('input[type=checkbox]:checked.first-checks');
  const firstThrowList = selectFirstNumbers
    ? addSingleNumberThrowList(selectFirstNumbers)
    : allNumbers;

  // 三投目が指定されている場合はその値を、指定されていない場合はすべてのダブルを対象とする
  const selectThirdNumbers = getSelectNumbers('input[type=checkbox]:checked.third-checks');
  const thirdThrowList = selectThirdNumbers ?? leftNumbers;
  let targetScore: number;
  let calcScoreList: string[];

  try {
    targetScore = getInputNumber();
    calcScoreList = calcScore(targetScore, firstThrowList, thirdThrowList);
  } catch (e) {
    createErrorMessage(e);
    return;
  }
  openDialog(targetScore, calcScoreList);
});

closeButton?.addEventListener('click', () => {
  closeDialog();
});
