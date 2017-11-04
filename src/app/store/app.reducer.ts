import * as fromShoppingList from '../shopping-list/store-ngrx/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap, State} from "@ngrx/store";


export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
}
