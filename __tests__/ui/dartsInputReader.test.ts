import { NoInputNumberError } from '@/constants/error';
import { getInputNumber, getSelectNumbers } from '@/ui/dartsInputReader';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('getSelectNumbers', () => {
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
describe('getInputNumber', () => {
  it('入力値が取得できること', () => {
    const inputNumber = 40;
    document.body.innerHTML = `<input type="number" id="inputNumber" value="${inputNumber}"/>
    `;
    const actual = getInputNumber();
    expect(inputNumber).toBe(actual);
  });
  it('入力値が無い場合、エラーとなること', () => {
    document.body.innerHTML = '<input type="number" id="inputNumber" value="" />';
    expect(() => {
      getInputNumber();
    }).toThrow(NoInputNumberError);
  });
  it('入力値が全角数字の場合、エラーとなること', () => {
    document.body.innerHTML = '<input type="number" id="inputNumber" value="４０" />';
    expect(() => {
      getInputNumber();
    }).toThrow(NoInputNumberError);
  });
  it('入力値が数字以外の場合、エラーとなること', () => {
    document.body.innerHTML = '<input type="number" id="inputNumber" value="[]" />';
    expect(() => {
      getInputNumber();
    }).toThrow(NoInputNumberError);
  });
});
