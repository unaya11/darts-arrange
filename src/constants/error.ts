import { ErrorFactory } from '@praha/error-factory';

export class NoInputNumberError extends ErrorFactory({
  name: 'NoInputNumberError',
  message: '数字を入力してください',
}) {}

export class NoResultError extends ErrorFactory({
  name: 'NoLeftNuberError',
  message: '選択した条件での上がり目が存在しません',
}) {}
