import { Meal } from '../reducers/meals';

export const ADD_MEAL = 'ADD_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';
export const REMOVE_MEAL = 'REMOVE_MEAL';

export interface AddMealAction {
  type: typeof ADD_MEAL;
  payload: Meal;
}

export interface UpdateMealAction {
  type: typeof UPDATE_MEAL;
  payload: Meal;
}

export interface RemoveMealAction {
  type: typeof REMOVE_MEAL;
  payload: { loggedTime: Date };
}

export type MealsActionTypes =
  | AddMealAction
  | UpdateMealAction
  | RemoveMealAction;
