import * as React from 'react';
import {
  NativeSelect as MUINativeSelect,
  NativeSelectProps,
} from '@material-ui/core';

export const NativeSelect = (
  props: NativeSelectProps,
): ReturnType<typeof MUINativeSelect> => <MUINativeSelect {...props} />;
