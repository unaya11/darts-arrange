import { ErrorFactory } from '@praha/error-factory';

export class NoInputNumberError extends ErrorFactory({
  name: 'NoInputNumberError',
  message: '半角数字を入力してください',
}) {}

export class NoResultError extends ErrorFactory({
  name: 'NoResultError',
  message: '選択した条件での上がり目が存在しません',
}) {}
