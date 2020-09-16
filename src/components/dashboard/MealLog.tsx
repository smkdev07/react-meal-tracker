import React, { useState } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableSortLabel,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { RootState } from '../../store/reducers/index';
import { Meal } from '../../store/reducers/meals';
import { removeMealFromDatabase } from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Meal;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

const HEAD_CELLS: HeadCell[] = [
  {
    id: 'loggedTime',
    label: 'Entry Time',
    numeric: false,
    disablePadding: false,
  },
  { id: 'category', label: 'Category', numeric: false, disablePadding: false },
  {
    id: 'description',
    label: 'Description',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'gramsProtien',
    label: 'Protein (g)',
    numeric: true,
    disablePadding: false,
  },
  { id: 'gramsFat', label: 'Fat (g)', numeric: true, disablePadding: false },
  {
    id: 'gramsCarbohydrate',
    label: 'Carbohydrate (g)',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'totalCalories',
    label: 'Total Calories',
    numeric: true,
    disablePadding: false,
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Meal
  ) => void;
  order: Order;
  orderBy: string;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Meal) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {HEAD_CELLS.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key="actions">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface MealLogProps extends PropsFromRedux {}

const MealLog: React.FC<MealLogProps> = (props) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Meal>('loggedTime');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { token, meals, deleteEntry } = props;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, meals.length - page * rowsPerPage);

  const onRequestSortHandler = (
    event: React.MouseEvent<unknown>,
    property: keyof Meal
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onDeleteEntryHandler = (entryId: string) => {
    deleteEntry(token!, entryId);
  };

  const onPageChangeHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onChangeRowsPerPageHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size="small" stickyHeader>
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSortHandler}
        />
        <TableBody>
          {stableSort(meals, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover key={row.id}>
                <TableCell align="left">
                  {row.loggedTime.toLocaleString()}
                </TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right">{row.gramsProtien}</TableCell>
                <TableCell align="right">{row.gramsFat}</TableCell>
                <TableCell align="right">{row.gramsCarbohydrate}</TableCell>
                <TableCell align="right">
                  <Chip label={row.totalCalories} color="secondary" />
                </TableCell>
                <TableCell padding="checkbox" align="right">
                  <Tooltip title="Delete Entry" arrow>
                    <IconButton onClick={() => onDeleteEntryHandler(row.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 33 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={meals.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onPageChangeHandler}
        onChangeRowsPerPage={onChangeRowsPerPageHandler}
      />
    </TableContainer>
  );
};

const mapState = (state: RootState) => ({
  token: state.auth.token,
  meals: state.meals.meals,
});

const mapDispatch = {
  deleteEntry: (token: string, id: string) => removeMealFromDatabase(token, id),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MealLog);
