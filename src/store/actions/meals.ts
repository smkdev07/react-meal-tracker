import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import {
  GET_START,
  SET_MEAL_CATEGORIES,
  SET_MEALS,
  GET_FAILURE,
  ADD_MEAL,
  REMOVE_MEAL,
  GetStartAction,
  SetMealCategoriesAction,
  SetMealsAction,
  GetFailureAction,
  AddMealAction,
  RemoveMealAction,
} from './meals-action-types';
import { RootState } from '../reducers/index';
import { Meal } from '../reducers/meals';

const getStart = (): GetStartAction => {
  return {
    type: GET_START,
  };
};

export const setMealCategories = (
  mealCategories: string[]
): SetMealCategoriesAction => {
  return {
    type: SET_MEAL_CATEGORIES,
    payload: { mealCategories },
  };
};

export const setMeals = (meals: Meal[]): SetMealsAction => {
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

const removeMeal = (id: string): RemoveMealAction => {
  return {
    type: REMOVE_MEAL,
    payload: { id },
  };
};

export const getMealCategories = (
  token: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(getStart());
    axios
      .get(
        `${process.env.REACT_APP_FIREBASE_BASE_URL}meal-categories.json?auth=${token}`
      )
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
        `${process.env.REACT_APP_FIREBASE_BASE_URL}meal-entries.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
      )
      .then((response) => {
        const meals: Meal[] = [];
        for (const key in response.data) {
          meals.push({
            id: key,
            ...response.data[key],
            loggedTime: new Date(response.data[key].loggedTime),
          });
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
    delete meal.id;
    axios
      .post(
        `${process.env.REACT_APP_FIREBASE_BASE_URL}meal-entries.json?auth=${token}`,
        meal
      )
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

export const removeMealFromDatabase = (
  token: string,
  id: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(getStart());
    axios
      .delete(
        `${process.env.REACT_APP_FIREBASE_BASE_URL}meal-entries/${id}.json?auth=${token}`
      )
      .then((response) => {
        dispatch(removeMeal(id));
      })
      .catch((error) => {
        const message = error.response.data.error;
        dispatch(getFailure(message));
      });
  };
};
