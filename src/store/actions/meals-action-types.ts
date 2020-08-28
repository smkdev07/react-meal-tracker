import { Meal } from '../reducers/meals';

export const GET_START = 'GET_START';
export const SET_MEAL_CATEGORIES = 'SET_MEAL_CATEGORIES';
export const SET_MEALS = 'SET_MEALS';
export const GET_FAILURE = 'GET_FAILURE';
export const ADD_MEAL = 'ADD_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';
export const REMOVE_MEAL = 'REMOVE_MEAL';

export interface GetStartAction {
  type: typeof GET_START;
}

export interface SetMealCategoriesAction {
  type: typeof SET_MEAL_CATEGORIES;
  payload: { mealCategories: string[] };
}

export interface SetMealsAction {
  type: typeof SET_MEALS;
  payload: { meals: Meal[] };
}

export interface GetFailureAction {
  type: typeof GET_FAILURE;
  payload: { errorMessage: string };
}

export interface AddMealAction {
  type: typeof ADD_MEAL;
  payload: { meal: Meal };
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
  | GetStartAction
  | SetMealCategoriesAction
  | SetMealsAction
  | GetFailureAction
  | AddMealAction
  | UpdateMealAction
  | RemoveMealAction;
