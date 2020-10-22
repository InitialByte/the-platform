import {useState, FC} from 'react';
import {useSelector} from 'react-redux';
import {Snackbar /* , Alert, AlertTitle */} from '@the_platform/react-uikit';
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Notification: FC = () => {
  const {toasts} = useSelector((state: TRootState) => state.notification);
  const [toastsToHide, setToastHide] = useState<number[]>([]);
  const handleClose = (index: number): void => {
    if (!toastsToHide.includes(index)) {
      setToastHide((oldToastsToHide) => [...oldToastsToHide, index]);
    }
  };
  const indexKey = 2;

  // TODO add it later to snackbar as children, now it has error
  /* <Alert onClose={() => handleClose(index)} severity={type}>
          <AlertTitle>{type}</AlertTitle>
          {message}
        </Alert> */

  return toasts.map(
    ({lifeTime, type, message, position}: IToast, index: number) => (
      <Snackbar
        key={`${type}_${index * indexKey}`}
        anchorOrigin={position}
        open={!toastsToHide.includes(index)}
        autoHideDuration={lifeTime}
        message={message}
        onClose={() => handleClose(index)}
      />
    ),
  );
};
