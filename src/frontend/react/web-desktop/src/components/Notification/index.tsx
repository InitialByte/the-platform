import * as React from 'react';
import {useState, FC, Component} from 'react';
import {useSelector} from 'react-redux';
import {Snackbar, Alert} from '@the_platform/react-uikit';
import {TRootState} from '../../store';

interface IToast {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  position: {
    vertical: 'top' | 'bottom',
    horizontal: 'center' | 'right' | 'left',
  };
  lifeTime: number;
}

export const Notification: FC = () => {
  const {toasts} = useSelector((state: TRootState) => state.notification);
  const [toastsToHide, setToastHide] = useState<[]>([]);
  const handleClose = (index: number): void => {
    if (!toastsToHide.includes(index)) {
      setToastHide((oldToastsToHide) => [...oldToastsToHide, index]);
    }
  };
  const indexKey = 2;

  return toasts.map(
    ({lifeTime, type, message, position}: IToast, index: number): Component => (
      <Snackbar
        key={`${type}_${index * indexKey}`}
        anchorOrigin={position}
        open={!toastsToHide.includes(index)}
        autoHideDuration={lifeTime}
        onClose={handleClose}>
        <Alert onClose={() => handleClose(index)} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    ),
  );
};
