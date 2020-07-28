import * as React from 'react';
import {Button} from '@storybook/react/demo';

export default {
  title: 'Button',
};

export const withText = (): JSX.Element => <Button>Hello Button</Button>;
