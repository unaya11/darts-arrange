import { getSelectNumbers } from '@/ui/dartsInputReader';

describe('getSelectNumbers', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('チェックが入っている場合、値を取得できること', () => {
    document.body.innerHTML = `
      <input type="checkbox" value="60" class="first-checks" id="first-60" checked />
      <input type="checkbox" value="57" class="first-checks" id="first-57" checked />
      <input type="checkbox" value="50" class="first-checks" id="first-50" />
    `;
    const actual = getSelectNumbers('input[type=checkbox]:checked.first-checks');
    expect(actual).toStrictEqual([60, 57]);
  });
  it('チェックが入っていない場合、undefinedを返すこと', () => {
    document.body.innerHTML = `
      <input type="checkbox" value="60" class="first-checks" id="first-60" />
      <input type="checkbox" value="57" class="first-checks" id="first-57" />
      <input type="checkbox" value="50" class="first-checks" id="first-50" />
    `;
    const actual = getSelectNumbers('input[type=checkbox]:checked.first-checks');
    expect(actual).toBe(undefined);
  });
  it('違う属性の値を取得できないこと', () => {
    document.body.innerHTML = `
      <input type="checkbox" value="60" class="first-checks" id="first-60" checked />
      <input type="checkbox" value="57" class="first-checks" id="first-57" checked />
      <input type="checkbox" value="40" class="third-checks" id="check-40" checked />
    `;
    const actual = getSelectNumbers('input[type=checkbox]:checked.first-checks');
    expect(actual).toStrictEqual([60, 57]);
    expect(actual).not.toContain(40);
  });
});
describe('getInputNumber');
