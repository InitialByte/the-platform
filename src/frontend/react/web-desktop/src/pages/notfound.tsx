import * as React from 'react';
import {FC} from 'react';
import {useTranslation} from '@the_platform/core';

const NotFoundPage: FC = () => {
  const {t} = useTranslation('root');

  return (
    <>
      <div>{t('notfound.title')}</div>
      {t('notfound.description')}
    </>
  );
};

NotFoundPage.displayName = 'NotFoundPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default NotFoundPage;
