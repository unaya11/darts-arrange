import './styles/main.css';
import { EvaluatedRoute, leftNumbers, scoringNumbers } from '@/constants/darts';
import { addSingleNumberThrowList, calcScore } from '@/logic/score';
import { getInputNumber, getSelectNumbers } from '@/ui/dartsInputReader';
import {
  checkAllsFirst,
  checkAllsThird,
  closeButton,
  closeDialog,
  createErrorMessage,
  firstChecks,
  openDialog,
  showButton,
  thirdChecks,
  toggleAllChecks,
} from '@/ui/view';

// 1本目の全選択
checkAllsFirst?.addEventListener('click', () => {
  toggleAllChecks(checkAllsFirst!, firstChecks);
});

// 上がり目の全選択
checkAllsThird?.addEventListener('click', () => {
  toggleAllChecks(checkAllsThird!, thirdChecks);
});

showButton?.addEventListener('click', () => {
  // 一投目が指定されている場合はその値とそのシングルを対象とし、指定されていない場合はすべてを対象とする
  const selectFirstNumbers = getSelectNumbers('input[type=checkbox]:checked.first-checks');
  const firstThrowList = selectFirstNumbers
    ? addSingleNumberThrowList(selectFirstNumbers)
    : scoringNumbers;

  // 三投目が指定されている場合はその値を、指定されていない場合はすべてのダブルを対象とする
  const selectThirdNumbers = getSelectNumbers('input[type=checkbox]:checked.third-checks');
  const thirdThrowList = selectThirdNumbers ?? leftNumbers;
  let targetScore: number;
  let calcScoreList: EvaluatedRoute[];

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
