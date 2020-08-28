import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import {
  GET_START,
  SET_MEAL_CATEGORIES,
  SET_MEALS,
  GET_FAILURE,
  ADD_MEAL,
  GetStartAction,
  SetMealCategoriesAction,
  SetMealsAction,
  GetFailureAction,
  AddMealAction,
} from './meals-action-types';
import { RootState } from '../reducers/index';
import { Meal } from '../reducers/meals';

const MEAL_CATEGORIES_URL =
  'https://meal-tracker-208d9.firebaseio.com/meal-categories.json';
const MEAL_ENTRIES_URL =
  'https://meal-tracker-208d9.firebaseio.com/meal-entries.json';

const getStart = (): GetStartAction => {
  return {
    type: GET_START,
  };
};

const setMealCategories = (
  mealCategories: string[]
): SetMealCategoriesAction => {
  return {
    type: SET_MEAL_CATEGORIES,
    payload: { mealCategories },
  };
};

const setMeals = (meals: Meal[]): SetMealsAction => {
  return {
    type: SET_MEALS,
    payload: { meals },
  };
};

const getFailure = (errorMessage: string): GetFailureAction => {
  return {
    type: GET_FAILURE,
    payload: { errorMessage },
  };
};

const addMeal = (meal: Meal): AddMealAction => {
  return {
    type: ADD_MEAL,
    payload: { meal },
  };
};

export const getMealCategories = (
  token: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(getStart());
    axios
      .get(`${MEAL_CATEGORIES_URL}?auth=${token}`)
      .then((response) => {
        const mealCategories = response.data;
        dispatch(setMealCategories(mealCategories));
      })
      .catch((error) => {
        const message = error.response.data.error;
        dispatch(getFailure(message));
      });
  };
};

export const getMealsFromDatabase = (
  token: string,
  userId: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(getStart());
    axios
      .get(
        `${MEAL_ENTRIES_URL}?auth=${token}&orderBy="userId"&equalTo="${userId}"`
      )
      .then((response) => {
        const meals: Meal[] = [];
        for (const key in response.data) {
          meals.push({ id: key, ...response.data[key] });
        }
        dispatch(setMeals(meals));
      })
      .catch((error) => {
        const message = error.response.data.error;
        dispatch(getFailure(message));
      });
  };
};

export const addMealToDatabase = (
  token: string,
  meal: Meal
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(getStart());
    axios
      .post(`${MEAL_ENTRIES_URL}?auth=${token}`, meal)
      .then((response) => {
        const { name } = response.data;
        dispatch(addMeal({ ...meal, id: name }));
      })
      .catch((error) => {
        const message = error.response.data.error;
        dispatch(getFailure(message));
      });
  };
};
