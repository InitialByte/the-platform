import {Grid as MUIGrid, GridProps} from '@material-ui/core';

export const Grid = (props: GridProps): ReturnType<typeof MUIGrid> => (
  <MUIGrid {...props} />
);
