import {Checkbox as MUICheckbox, CheckboxProps} from '@material-ui/core';

export const Checkbox = (
  props: CheckboxProps,
): ReturnType<typeof MUICheckbox> => <MUICheckbox {...props} />;
