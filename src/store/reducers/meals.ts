import {
  ADD_MEAL,
  UPDATE_MEAL,
  REMOVE_MEAL,
  AddMealAction,
  UpdateMealAction,
  RemoveMealAction,
  MealsActionTypes,
} from '../actions/meals-action-types';

// meal category list 'Breakfast'  'Lunch'  'Dinner'  'Snack'  'Other'

// calculate cals for protien, fat, carbs, total cals
export interface Meal {
  loggedTime: Date;
  mealTime: Date;
  category: string;
  description: string;
  gramsProtien: number;
  gramsFat: number;
  gramsCarbohydrate: number;
}

export interface MealsState {
  userId: string | null;
  meals: Meal[];
}

const initialState: MealsState = {
  userId: null,
  meals: [],
};

const addMeal = (state: MealsState, action: AddMealAction) => {
  return {
    ...state,
    meals: [...state.meals, action.payload],
  };
};

const updateMeal = (state: MealsState, action: UpdateMealAction) => {
  return {
    ...state,
    meals: [...state.meals, action.payload],
  };
};

const removeMeal = (state: MealsState, action: RemoveMealAction) => {
  return {
    ...state,
    meals: [...state.meals, action.payload],
  };
};

const mealsReducer = (state = initialState, action: MealsActionTypes) => {
  switch (action.type) {
    case ADD_MEAL:
      return addMeal(state, action);
    case UPDATE_MEAL:
      return updateMeal(state, action);
    case REMOVE_MEAL:
      return removeMeal(state, action);
    default:
      return state;
  }
};

export default mealsReducer;
