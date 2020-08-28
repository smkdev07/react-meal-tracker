import {
  GET_START,
  SET_MEAL_CATEGORIES,
  SET_MEALS,
  GET_FAILURE,
  ADD_MEAL,
  UPDATE_MEAL,
  REMOVE_MEAL,
  GetStartAction,
  SetMealCategoriesAction,
  SetMealsAction,
  GetFailureAction,
  AddMealAction,
  UpdateMealAction,
  RemoveMealAction,
  MealsActionTypes,
} from '../actions/meals-action-types';

// calculate cals for protien, fat, carbs, total cals
export interface Meal {
  id?: string;
  userId: string;
  loggedTime: Date;
  category: string;
  description: string;
  gramsProtien: number;
  gramsFat: number;
  gramsCarbohydrate: number;
}

export interface MealsState {
  meals: Meal[];
  mealCategories: string[]; // ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Other'] - stored in google firebase realtime db
  loading: boolean;
  error: string | null;
}

const initialState: MealsState = {
  meals: [],
  mealCategories: [],
  loading: false,
  error: null,
};

const getStart = (state: MealsState, action: GetStartAction) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const setMealCategories = (
  state: MealsState,
  action: SetMealCategoriesAction
) => {
  return {
    ...state,
    mealCategories: action.payload.mealCategories,
    loading: false,
    error: null,
  };
};

const setMeals = (state: MealsState, action: SetMealsAction) => {
  return {
    ...state,
    meals: action.payload.meals,
    loading: false,
    error: null,
  };
};

const getFailure = (state: MealsState, action: GetFailureAction) => {
  return {
    ...state,
    loading: false,
    error: action.payload.errorMessage,
  };
};

const addMeal = (state: MealsState, action: AddMealAction) => {
  return {
    ...state,
    meals: [...state.meals, action.payload.meal],
    loading: false,
    error: null,
  };
};

// const updateMeal = (state: MealsState, action: UpdateMealAction) => {
//   return {
//     ...state,
//     meals: [...state.meals, action.payload],
//   };
// };

// const removeMeal = (state: MealsState, action: RemoveMealAction) => {
//   return {
//     ...state,
//     meals: [...state.meals, action.payload],
//   };
// };

const mealsReducer = (state = initialState, action: MealsActionTypes) => {
  switch (action.type) {
    case GET_START:
      return getStart(state, action);
    case SET_MEAL_CATEGORIES:
      return setMealCategories(state, action);
    case SET_MEALS:
      return setMeals(state, action);
    case GET_FAILURE:
      return getFailure(state, action);
    case ADD_MEAL:
      return addMeal(state, action);
    // case UPDATE_MEAL:
    //   return updateMeal(state, action);
    // case REMOVE_MEAL:
    //   return removeMeal(state, action);
    default:
      return state;
  }
};

export default mealsReducer;
