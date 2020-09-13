import * as React from 'react';
import {Container as MUIContainer, ContainerProps} from '@material-ui/core';

export const Container = (
  props: ContainerProps,
): ReturnType<typeof MUIContainer> => <MUIContainer {...props} />;
