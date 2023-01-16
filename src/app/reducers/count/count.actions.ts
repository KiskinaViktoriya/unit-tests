import { Action } from '@ngrx/store';

export enum countActionsType {
  increase = '[COUNT] increase',
  decrease = '[COUNT] decrease',
  clear = '[COUNT] clear',
  updatedAt = '[COUNT] updated time',
}

export class CountIncraeseAction implements Action {
  readonly type = countActionsType.increase;
}

export class CountDecraeseAction implements Action {
  readonly type = countActionsType.decrease;
}

export class CountClearAction implements Action {
  readonly type = countActionsType.clear;
}

export class CountUpdatedAtAction implements Action {
  readonly type = countActionsType.updatedAt;

  constructor(
    public payload: {
      updatedAt: number;
    }
  ) {}
}

export type CountActions =
  | CountIncraeseAction
  | CountDecraeseAction
  | CountClearAction
  | CountUpdatedAtAction;
