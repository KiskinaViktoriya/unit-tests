import { shoppingCartReducer } from './shoppingCart/shoppingCart.reducer';
import { Cart } from './../models/cart.model';
import { CountState, countReducer, countNode } from './count/count.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from './../../environments/environment.prod';

export interface State {
  count: CountState;
  shoppingCart: Cart;
}

export const reducers: ActionReducerMap<State, any> = {
  count: countReducer,
  shoppingCart: shoppingCartReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
