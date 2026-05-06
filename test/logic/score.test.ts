import { allNumbers, notBogyNumbers, singleNumbers } from '@/constants/darts';
import { NoResultError } from '@/constants/error';
import * as scoreLogic from '@/logic/score';

const { addSingleNumberThrowList, calcScore } = scoreLogic;

describe('calcScoreのテスト_calcCheckoutScore', () => {
  it('170点以下の場合、calcCheckoutScore が呼ばれること', () => {
    const resultList = calcScore(167, [60, 57], [50]);
    expect(resultList[0].nextTarget).toBe(0);
  });
  it('resultListが空ではない場合、例外が投げられないこと', () => {
    expect(() => {
      calcScore(170, [60], [50]);
    }).not.toThrow(NoResultError);
  });
  it('resultSetが空の場合、例外が投げられること', () => {
    expect(() => {
      calcScore(170, [10], [10]);
    }).toThrow(NoResultError);
  });
  it('1投目と2投目が入れ替わる（3投目は同じ）パターンの場合、どちらもresultListに追加されること', () => {
    const resultList = calcScore(167, [60, 57], [50]);
    expect(resultList).toHaveLength(2);
  });
  it('1投目と2投目が同じパターンの場合、重複してresultListに追加されないこと', () => {
    const resultList = calcScore(170, [60, 60], [50]);
    expect(resultList).toHaveLength(1);
  });
  it('resultListに入っている中身を足した結果、targetScoreと一致すること', () => {
    const targetScore = 100;
    const resultList = calcScore(targetScore, allNumbers, allNumbers);
    expect(resultList.length).toBeGreaterThan(0);

    resultList.forEach((result) => {
      const [f, s, t] = result.route.map(Number);
      expect(f + s + t).toBe(targetScore);
    });
  });

  describe('addSingleNumberThrowListのテスト_calcMiddleRangeScore', () => {
    it('171点〜235点の場合、calcMiddleRangeScoreが呼ばれること', () => {
      const resultList1 = scoreLogic.calcScore(235, [20], [40]);
      const resultList2 = scoreLogic.calcScore(171, [20], [40]);
      expect(resultList1[0].nextTarget).toBe(170);
      expect(resultList2[0].nextTarget).toBe(111);
    });
    it('ボギーナンバー回避の検証: 残りスコアが169等になるルートは除外されていること', () => {
      // targetScoreが 229 の時、20-20-20 を投げると残りは 169 (ボギー)
      const targetScore = 229;
      const resultList = scoreLogic.calcScore(targetScore, [], []);

      // 結果の中に nextTarget が 169 のものは存在しないはず
      const hasBogy = resultList.some((r) => r.nextTarget === 169);
      expect(hasBogy).toBe(false);
    });
    it('計算整合性の検証: targetScore = route合計 + nextTarget となっていること', () => {
      const target = 210;
      const resultList = scoreLogic.calcScore(target, [], []);

      resultList.forEach((r) => {
        const sum = r.route.reduce((a, b) => a + b, 0);
        expect(sum + r.nextTarget).toBe(target);
      });
    });
  });

  describe('addSingleNumberThrowListのテスト_calcHighRangeScore', () => {
    it('236点以上の場合、calcHighRangeScore が呼ばれること', () => {
      const resultList = calcScore(309, [19], [60]);
      expect(resultList[0].nextTarget).toBe(170);

      if (resultList.length >= 2) {
        expect(resultList[0].score).toBeGreaterThanOrEqual(resultList[1].score);
      }

      // すべてのルートで残りスコアが170以下になっているか
      resultList.forEach((r) => {
        expect(r.nextTarget).toBeLessThanOrEqual(170);
      });
    });

    it('3本目がブル(25/50)の場合、残りスコアがnotBogyNumbers（上がり目あり）になっていること', () => {
      // 3本目にブルを狙う必要がある高得点帯をシミュレート
      const resultList = scoreLogic.calcScore(240, [], []);

      const bullRoutes = resultList.filter((r) => r.route[2] === 25 || r.route[2] === 50);

      bullRoutes.forEach((r) => {
        // bull.includes(r.route[2]) の時、nextTarget は必ず 170以下の非ボギー
        expect(r.nextTarget).toBeLessThanOrEqual(170);
        expect(notBogyNumbers).toContain(r.nextTarget);
      });
    });

    it('境界値の検証: 236点で正しく calcHighRangeScore のロジックが動くこと', () => {
      const result = scoreLogic.calcScore(236, [], []);
      expect(result.length).toBeGreaterThan(0);
    });

    it('削りきれない（170以下にできない）超高得点の場合、NoResultErrorを投げること', () => {
      // 3本トリプル20(180点)でも 170以下にできない点数
      // 180 + 170 = 350 なので、351点以上なら理論上エラーになる
      expect(() => {
        scoreLogic.calcScore(999, [], []);
      }).toThrow(NoResultError);
    });

    it('luckyNumbers（1投目がシングル）による加点が正しく行われていること', () => {
      const resultList = scoreLogic.calcScore(250, [], []);

      // 1投目がシングルのルートを探す
      const singleFirstRoute = resultList.find((r) => singleNumbers.includes(r.route[0]));

      // シングルが luckyNumbers に追加され、evaluateArrangementQuality で加点されているはず
      if (singleFirstRoute) {
        expect(singleFirstRoute.score).toBeGreaterThanOrEqual(10);
      }
    });

    describe('addSingleNumberThrowListのテスト', () => {
      it('3で割り切れる数字の場合、元の数字と3で割った数字が含まれること', () => {
        const actual = addSingleNumberThrowList([60]);
        expect(actual).toStrictEqual([60, 20]);
      });
      it('3で割り切れない数字の場合、元の数字のみ含まれること', () => {
        const actual = addSingleNumberThrowList([10]);
        expect(actual).toStrictEqual([10]);
      });
      it('インナーBull(50)の場合、アウターBull(25)が含まれること', () => {
        const actual = addSingleNumberThrowList([50]);
        expect(actual).toStrictEqual([50, 25]);
      });
      it('複数指定されている場合、全てのトリプルとシングルが算出されること', () => {
        const actual = addSingleNumberThrowList([60, 57]);
        expect(actual).toEqual(expect.arrayContaining([60, 20, 57, 19]));
      });
      it('元の配列が変更（破壊）されないこと', () => {
        const input = [60];
        addSingleNumberThrowList(input);
        expect(input).toStrictEqual([60]);
      });
    });
  });
});

describe('chatGPTに書かせてみた', () => {
  describe('calcScore 強化テスト', () => {
    describe('checkout（〜170）', () => {
      it('合計がtargetScoreと一致すること', () => {
        const target = 100;
        const resultList = calcScore(target, allNumbers, allNumbers);
        expect(resultList.length).toBeGreaterThan(0);
        resultList.forEach((r) => {
          const sum = r.route.reduce((a, b) => a + b, 0);
          expect(sum).toBe(target);
        });
      });
      it('resultが空の場合は例外が投げられること', () => {
        expect(() => {
          calcScore(170, [10], [10]);
        }).toThrow(NoResultError);
      });
      it('順序を含めてルートが正しく保持されること', () => {
        const resultList = calcScore(167, [60, 57], [50]);
        expect(resultList).toContainEqual({ route: [60, 57, 50], score: 0, nextTarget: 0 });
        expect(resultList).toContainEqual({ route: [57, 60, 50], score: 0, nextTarget: 0 });
      });
      it('重複ルートが存在しないこと', () => {
        const resultList = calcScore(170, [60, 60], [50]);
        const seen = new Set<string>();
        resultList.forEach((r) => {
          const key = `${r.route.join('-')}-${r.nextTarget}`;
          expect(seen.has(key)).toBe(false);
          seen.add(key);
        });
      });
    });
    describe('middle（171〜235）', () => {
      it('ボギーナンバーが除外されていること', () => {
        const resultList = calcScore(229, [], []);
        const hasBogy = resultList.some((r) => r.nextTarget === 169);
        expect(hasBogy).toBe(false);
      });
      it('route + nextTarget = targetScore になること', () => {
        const target = 210;
        const resultList = calcScore(target, [], []);
        resultList.forEach((r) => {
          const sum = r.route.reduce((a, b) => a + b, 0);
          expect(sum + r.nextTarget).toBe(target);
        });
      });
    });
    describe('high（236〜）', () => {
      it('nextTargetがすべて170以下であること', () => {
        const resultList = calcScore(309, [], []);
        resultList.forEach((r) => {
          expect(r.nextTarget).toBeLessThanOrEqual(170);
        });
      });
      it('bull使用時はnotBogyNumbersを満たすこと', () => {
        const resultList = calcScore(240, [], []);
        const bullRoutes = resultList.filter((r) => r.route[2] === 25 || r.route[2] === 50);
        bullRoutes.forEach((r) => {
          expect(r.nextTarget).toBeLessThanOrEqual(170);
          expect(notBogyNumbers).toContain(r.nextTarget);
        });
      });
      it('スコアが降順にソートされていること', () => {
        const resultList = calcScore(250, [], []);
        for (let i = 0; i < resultList.length - 1; i++) {
          expect(resultList[i].score).toBeGreaterThanOrEqual(resultList[i + 1].score);
        }
      });
      it('シングル始動の方が高スコアになること', () => {
        const resultList = calcScore(250, [], []);
        const singleRoute = resultList.find((r) => singleNumbers.includes(r.route[0]));
        const nonSingleRoute = resultList.find((r) => !singleNumbers.includes(r.route[0]));
        if (singleRoute && nonSingleRoute) {
          expect(singleRoute.score).toBeGreaterThan(nonSingleRoute.score);
        }
      });
      it('重複ルートが存在しないこと', () => {
        const resultList = calcScore(250, [], []);
        const seen = new Set<string>();
        resultList.forEach((r) => {
          const key = `${r.route.join('-')}-${r.nextTarget}`;
          expect(seen.has(key)).toBe(false);
          seen.add(key);
        });
      });
      it('削りきれない場合は例外になること', () => {
        expect(() => {
          calcScore(999, [], []);
        }).toThrow(NoResultError);
      });
      it('2投目と3投目を入れ替えた重複が存在しないこと', () => {
        const resultList = calcScore(250, [], []);

        const hasDuplicate = resultList.some((r1, i) =>
          resultList.some((r2, j) => {
            if (i === j) return false;

            return (
              r1.route[0] === r2.route[0] &&
              r1.route[1] === r2.route[2] &&
              r1.route[2] === r2.route[1] &&
              r1.nextTarget === r2.nextTarget
            );
          }),
        );

        expect(hasDuplicate).toBe(false);
      });
    });
    describe('境界値', () => {
      it('170と171で結果が異なること', () => {
        const r170 = calcScore(170, [60], [50]);
        const r171 = calcScore(171, [], []);
        expect(r170).not.toEqual(r171);
      });
      it('235と236で結果が異なること', () => {
        const r235 = calcScore(235, [], []);
        const r236 = calcScore(236, [], []);
        expect(r235).not.toEqual(r236);
      });
    });
  });
  describe('addSingleNumberThrowList', () => {
    it('3で割り切れる場合はシングルが追加されること', () => {
      const result = addSingleNumberThrowList([60]);
      expect(result).toEqual([60, 20]);
    });
    it('bullの場合は25が追加されること', () => {
      const result = addSingleNumberThrowList([50]);
      expect(result).toEqual([50, 25]);
    });
    it('重複が発生しないこと', () => {
      const result = addSingleNumberThrowList([60, 57, 50]);
      const unique = new Set(result);
      expect(unique.size).toBe(result.length);
    });
    it('元の配列が変更されないこと', () => {
      const input = [60];
      addSingleNumberThrowList(input);
      expect(input).toStrictEqual([60]);
    });
    it('空配列でも安全に動作すること', () => {
      const result = addSingleNumberThrowList([]);
      expect(result).toEqual([]);
    });
  });
});
