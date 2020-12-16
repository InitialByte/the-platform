import {Select as MUISelect, SelectProps} from '@material-ui/core';

export const Select = (props: SelectProps): ReturnType<typeof MUISelect> => (
  <MUISelect {...props} />
);
