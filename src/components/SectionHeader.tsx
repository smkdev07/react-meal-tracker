import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  overline: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 4,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    height: 8,
    width: 48,
  },
  spacingBottom: (spacingBottom: number) => ({
    marginBottom: theme.spacing(spacingBottom),
  }),
}));

interface SectionHeaderProps {
  title: string;
  spacingBottom?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  spacingBottom = 0,
}) => {
  const classes = useStyles(spacingBottom);
  return (
    <>
      <div className={classes.overline} />
      <Typography
        align="left"
        color="textSecondary"
        variant="h5"
        className={classes.spacingBottom}
      >
        {title}
      </Typography>
    </>
  );
};

export default SectionHeader;
