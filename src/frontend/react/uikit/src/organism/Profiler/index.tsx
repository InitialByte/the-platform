import * as React from 'react';
import {Profiler, ReactElement, Component} from 'react';

type TRenderCallback = (
  // the "id" prop of the Profiler tree that has just committed
  id: string,
  // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  phase: 'mount' | 'update',
  // time spent rendering the committed update
  actualDuration: number,
  // estimated time to render the entire subtree without memoization
  baseDuration: number,
  // when React began rendering this update
  startTime: number,
  // when React committed this update
  commitTime: number,
  // the Set of interactions belonging to this update
  interactions: unknown,
) => void;

export const withProfiler = (
  WrappedComponent: new () => Component<unknown, unknown>,
  id: string,
  onRender: TRenderCallback,
): ReactElement => (
  <Profiler id={id} onRender={onRender}>
    <WrappedComponent />
  </Profiler>
);
