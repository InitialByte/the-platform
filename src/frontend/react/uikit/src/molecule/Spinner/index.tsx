import * as React from 'react';
import {ReactNode, FC} from 'react';

interface IProps {
  preloader?: ReactNode;
}

export const Spinner: FC<IProps> = ({preloader = '🌀'}) => (
  <div aria-busy="true">
    <span aria-hidden="true">{preloader}</span>
  </div>
);

Spinner.displayName = 'Spinner';
