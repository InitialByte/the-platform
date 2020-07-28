import {Component, ReactNode} from 'react';
import {logger} from '@the_platform/core';

interface Props {
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

interface IComponentStack {
  componentStack: string;
}

export class ErrorBoundary extends Component<Props, State> {
  readonly state: State = {
    hasError: false,
  };

  componentDidCatch(error: string, {componentStack}: IComponentStack): void {
    this.setState({hasError: true});
    // logger.error(E_CODE.E_1, [error, componentStack]);
  }

  render(): ReactNode {
    const {
      fallback = 'Error happened',
      children,
    } = this.props;

    return this.state.hasError ? fallback : children;
  }
}
