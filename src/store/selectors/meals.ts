import {
  gramsProtienToCalories,
  gramsFatToCalories,
  gramsCarbohydrateToCalories,
} from '../../utility/formulas';
import { Meal } from '../reducers/meals';

interface Statistics {
  id: string;
  label: string;
  grams?: number;
  calories: number;
  percentOfTotalCalories?: number;
  numberOfEntries?: number;
}

export const getEntryStatistics = (meals: Meal[]): Statistics[] => {
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
      grams: totalGramsProtien,
      calories: totalCaloriesProtien,
      percentOfTotalCalories: totalCaloriesProtien / totalCalories,
    },
    {
      id: 'fat',
      label: 'Total Fat',
      grams: totalGramsFat,
      calories: totalCaloriesFat,
      percentOfTotalCalories: totalCaloriesFat / totalCalories,
    },
    {
      id: 'carbohydrate',
      label: 'Total Carbohydrate',
      grams: totalGramsCarbohydrate,
      calories: totalCaloriesCarbohydrate,
      percentOfTotalCalories: totalCaloriesCarbohydrate / totalCalories,
    },
    {
      id: 'calories',
      label: 'Total Calories',
      calories: totalCalories,
      numberOfEntries: meals.length,
    },
  ];
};
