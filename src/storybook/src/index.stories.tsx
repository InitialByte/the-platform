import * as React from 'react';
import {FC} from 'react';
import {Button} from '@storybook/react/demo';

export default {
  title: 'Button',
};

export const withText: FC = () => <Button>Hello Button</Button>;
