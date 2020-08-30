import {
  gramsProtienToCalories,
  gramsFatToCalories,
  gramsCarbohydrateToCalories,
} from '../../utility/formulas';
import { Meal } from '../reducers/meals';

interface Statistics {
  id: string;
  label: string;
  color: string;
  grams?: number;
  calories: number;
  percentOfTotalCalories?: number;
  numberOfEntries?: number;
}

const COLORS = {
  protien: '#F50057',
  fat: '#F9A826',
  carbohydrate: '#00B0FF',
  totalCalories: '#00BFA6',
};

export const getEntryStatistics = (meals: Meal[]): Statistics[] => {
  if (meals.length === 0) {
    return [];
  }

  let totalGramsProtien = 0;
  let totalGramsFat = 0;
  let totalGramsCarbohydrate = 0;
  let totalCalories = 0;

  meals.forEach((meal) => {
    totalGramsProtien += meal.gramsProtien;
    totalGramsFat += meal.gramsFat;
    totalGramsCarbohydrate += meal.gramsCarbohydrate;
    totalCalories += meal.totalCalories;
  });

  const totalCaloriesProtien = gramsProtienToCalories(totalGramsProtien);
  const totalCaloriesFat = gramsFatToCalories(totalGramsFat);
  const totalCaloriesCarbohydrate = gramsCarbohydrateToCalories(
    totalGramsCarbohydrate
  );

  return [
    {
      id: 'protien',
      label: 'Total Protien',
      color: COLORS.protien,
      grams: totalGramsProtien,
      calories: totalCaloriesProtien,
      percentOfTotalCalories: totalCaloriesProtien / totalCalories,
    },
    {
      id: 'fat',
      label: 'Total Fat',
      color: COLORS.fat,
      grams: totalGramsFat,
      calories: totalCaloriesFat,
      percentOfTotalCalories: totalCaloriesFat / totalCalories,
    },
    {
      id: 'carbohydrate',
      label: 'Total Carbohydrate',
      color: COLORS.carbohydrate,
      grams: totalGramsCarbohydrate,
      calories: totalCaloriesCarbohydrate,
      percentOfTotalCalories: totalCaloriesCarbohydrate / totalCalories,
    },
    {
      id: 'calories',
      label: 'Total Calories',
      color: COLORS.totalCalories,
      calories: totalCalories,
      numberOfEntries: meals.length,
    },
  ];
};

export const getEntriesCalorieBreakdown = (meals: Meal[]) => {
  if (meals.length === 0) {
    return [];
  }
  return meals
    .sort((a, b) => b.loggedTime.getTime() - a.loggedTime.getTime())
    .map((meal) => ({
      loggedTime: meal.loggedTime.toLocaleString(),
      protien: gramsProtienToCalories(meal.gramsProtien),
      protienColor: COLORS.protien,
      fat: gramsFatToCalories(meal.gramsFat),
      fatColor: COLORS.fat,
      carbohydrate: gramsCarbohydrateToCalories(meal.gramsCarbohydrate),
      carbohydrateColor: COLORS.carbohydrate,
    }));
};
