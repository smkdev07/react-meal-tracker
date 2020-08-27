import { combineReducers } from 'redux';

import authReducer from './auth';
import mealsReducer from './meals';

export const rootReducer = combineReducers({
  auth: authReducer,
  meals: mealsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
