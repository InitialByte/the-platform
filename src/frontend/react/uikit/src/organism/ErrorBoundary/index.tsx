import {Component, ReactNode, ErrorInfo} from 'react';
import {logger} from '@the_platform/core';

interface Props {
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  readonly state: State = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({hasError: true});
    logger.error(E_CODE.E_1, error, errorInfo.componentStack);
  }

  render(): ReactNode {
    const {
      fallback = 'Error happened. Please contact administrator',
      children,
    } = this.props;

    return this.state.hasError ? fallback : children;
  }
}
