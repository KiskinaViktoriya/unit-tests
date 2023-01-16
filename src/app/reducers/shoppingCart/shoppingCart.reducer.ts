import { Cart } from './../../models/cart.model';
import {
  ShoppingCartActions,
  shoppingCartActionsType,
} from './shoppingCart.actions';

export const shoppingCartNode = 'shoppingCart';

// export interface ShoppingCartState {
//   items: Array<ShoppingCartItem>;
// }

// export interface ShoppingCartItem {
//   product: string;
//   name: string;
//   price: number;
//   quantity: number;
//   id: number;
// }

const initialState: Cart = {
  items: [],
};

export const shoppingCartReducer = (
  state = initialState,
  action: ShoppingCartActions
): Cart => {
  switch (action.type) {
    case shoppingCartActionsType.addItem:
      return {
        ...state,
        items: action.payload.cartItems,
      };
    case shoppingCartActionsType.removeItem:
      return {
        ...state,
        items: action.payload.cartItems,
      };
    case shoppingCartActionsType.clearAll:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
