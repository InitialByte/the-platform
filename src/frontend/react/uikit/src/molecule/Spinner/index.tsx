import * as React from 'react';
import {ReactNode} from 'react';

interface IProps {
  preloader?: ReactNode;
}

export function Spinner({preloader = '🌀'}: IProps): JSX.Element {
  return (
    <div aria-busy="true">
      <span aria-hidden="true">{preloader}</span>
    </div>
  );
}

Spinner.displayName = 'Spinner';
