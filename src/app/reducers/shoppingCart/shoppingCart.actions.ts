import { Cart, CartItem } from './../../models/cart.model';
import { Action } from '@ngrx/store';

export enum shoppingCartActionsType {
  addItem = '[SHOPPING_CART] addItem',
  removeItem = '[SHOPPING_CART] removeItem',
  clearAll = '[SHOPPING_CART] clearAll',
}

export class ShoppingCartAddItemAction implements Action {
  readonly type = shoppingCartActionsType.addItem;

  constructor(
    public payload: {
      cartItems: CartItem[];
    }
  ) {}
}

export class ShoppingCartRemoveItem implements Action {
  readonly type = shoppingCartActionsType.removeItem;

  constructor(
    public payload: {
      cartItems: CartItem[];
    }
  ) {}
}

export class ShoppingCartClearAll implements Action {
  readonly type = shoppingCartActionsType.clearAll;
}

export type ShoppingCartActions =
  | ShoppingCartAddItemAction
  | ShoppingCartClearAll
  | ShoppingCartRemoveItem;
