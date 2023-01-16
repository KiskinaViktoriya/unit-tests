import { shoppingCartNode } from './shoppingCart.reducer';
import { Cart, CartItem } from './../../models/cart.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectShoppingCartFeature =
  createFeatureSelector<Cart>(shoppingCartNode);

export const selectShoppingCartAddItem = createSelector(
  selectShoppingCartFeature,
  (state: Cart): CartItem[] => state.items
);

export const selectShopingCartRemoveItem = createSelector(
  selectShoppingCartFeature,
  (state: Cart): CartItem[] => state.items
);
