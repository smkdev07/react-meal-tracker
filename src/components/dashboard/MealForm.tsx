import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, MenuItem, Button } from '@material-ui/core';

import { INITIAL_INPUT_FIELD_STATE } from '../../utility/forms';
import {
  gramsProtienToCalories,
  gramsFatToCalories,
  gramsCarbohydrateToCalories,
} from '../../utility/formulas';
import { RootState } from '../../store/reducers/index';
import { Meal } from '../../store/reducers/meals';
import {
  getMealCategories,
  addMealToDatabase,
} from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
}));

interface MealFormProps extends PropsFromRedux {}

const MealForm: React.FC<MealFormProps> = (props) => {
  const classes = useStyles();
  const [mealCategory, setMealCategory] = useState({
    ...INITIAL_INPUT_FIELD_STATE,
  });
  const [mealDescription, setMealDescription] = useState({
    ...INITIAL_INPUT_FIELD_STATE,
  });
  const [gramsProtien, setGramsProtien] = useState({
    ...INITIAL_INPUT_FIELD_STATE,
  });
  const [gramsFat, setGramsFat] = useState({ ...INITIAL_INPUT_FIELD_STATE });
  const [gramsCarbohydrate, setGramscarbohydrate] = useState({
    ...INITIAL_INPUT_FIELD_STATE,
  });

  const { token, userId, mealCategories, getMealCategories, logEntry } = props;

  useEffect(() => {
    if (mealCategories.length === 0) {
      getMealCategories(token!);
    }
  }, [token, getMealCategories, mealCategories]);

  const onFieldChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    const value = event.target.value;
    const updatedField = {
      value,
      touched: true,
      valid: value.trim().length > 0,
    };

    switch (field) {
      case 'mealCategory':
        setMealCategory((prevState) => updatedField);
        break;
      case 'mealDescription':
        setMealDescription((prevState) => updatedField);
        break;
      case 'gramsProtien':
        setGramsProtien((prevState) => updatedField);
        break;
      case 'gramsFat':
        setGramsFat((prevState) => updatedField);
        break;
      case 'gramsCarbohydrate':
        setGramscarbohydrate((prevState) => updatedField);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const totalCalories =
      gramsProtienToCalories(+gramsProtien.value) +
      gramsFatToCalories(+gramsFat.value) +
      gramsCarbohydrateToCalories(+gramsCarbohydrate.value);
    logEntry(token!, {
      id: '',
      userId: userId!,
      loggedTime: new Date(),
      category: mealCategory.value,
      description: mealDescription.value,
      gramsProtien: +gramsProtien.value,
      gramsFat: +gramsFat.value,
      gramsCarbohydrate: +gramsCarbohydrate.value,
      totalCalories,
    });
    setMealCategory((prevState) => ({ ...INITIAL_INPUT_FIELD_STATE }));
    setMealDescription((prevState) => ({ ...INITIAL_INPUT_FIELD_STATE }));
    setGramsProtien((prevState) => ({ ...INITIAL_INPUT_FIELD_STATE }));
    setGramsFat((prevState) => ({ ...INITIAL_INPUT_FIELD_STATE }));
    setGramscarbohydrate((prevState) => ({ ...INITIAL_INPUT_FIELD_STATE }));
  };

  return (
    <Paper elevation={2} className={classes.paper}>
      <form noValidate onSubmit={onSubmitHandler}>
        <Grid container justify="space-around" alignItems="center" spacing={1}>
          <Grid item xs={12} md={4} xl={2}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="mealcategory"
              label="Category"
              select
              value={mealCategory.value}
              onChange={(event) => onFieldChangeHandler(event, 'mealCategory')}
              error={mealCategory.touched && !mealCategory.valid}
            >
              {mealCategories.map((mealCategory) => (
                <MenuItem key={mealCategory} value={mealCategory}>
                  {mealCategory}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4} xl={2}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="mealdescription"
              label="Description"
              type="text"
              value={mealDescription.value}
              onChange={(event) =>
                onFieldChangeHandler(event, 'mealDescription')
              }
              error={mealDescription.touched && !mealDescription.valid}
            />
          </Grid>
          <Grid item xs={12} md={4} xl={2}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="gramsprotien"
              label="Protein (g)"
              type="number"
              value={gramsProtien.value}
              onChange={(event) => onFieldChangeHandler(event, 'gramsProtien')}
              error={gramsProtien.touched && !gramsProtien.valid}
            />
          </Grid>
          <Grid item xs={12} md={4} xl={2}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="gramsfat"
              label="Fat (g)"
              type="number"
              value={gramsFat.value}
              onChange={(event) => onFieldChangeHandler(event, 'gramsFat')}
              error={gramsFat.touched && !gramsFat.valid}
            />
          </Grid>
          <Grid item xs={12} md={4} xl={2}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="gramscarbohydrate"
              label="Carbohydrate (g)"
              type="number"
              value={gramsCarbohydrate.value}
              onChange={(event) =>
                onFieldChangeHandler(event, 'gramsCarbohydrate')
              }
              error={gramsCarbohydrate.touched && !gramsCarbohydrate.valid}
            />
          </Grid>
          <Grid item xs={12} md={4} xl={1}>
            <Button
              type="submit"
              fullWidth
              size="medium"
              variant="contained"
              color="primary"
              disabled={
                !mealCategory.valid ||
                !mealDescription.valid ||
                !gramsProtien.valid ||
                !gramsFat.valid ||
                !gramsCarbohydrate.valid
              }
            >
              Log Entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const mapState = (state: RootState) => ({
  token: state.auth.token,
  userId: state.auth.userId,
  mealCategories: state.meals.mealCategories,
});

const mapDispatch = {
  getMealCategories: (token: string) => getMealCategories(token),
  logEntry: (token: string, meal: Meal) => addMealToDatabase(token, meal),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MealForm);
