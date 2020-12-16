import {FC} from 'react';
import {useTranslation} from '@the_platform/core';

const LoadingPage: FC = () => {
  const {t} = useTranslation('root');

  return t('loading.title');
};

LoadingPage.displayName = 'LoadingPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LoadingPage;
