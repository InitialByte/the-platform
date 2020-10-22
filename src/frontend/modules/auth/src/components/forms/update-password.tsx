import {FC} from 'react';
import {useDispatch} from 'react-redux';
import {Button, TextField, Form, makeStyles} from '@the_platform/react-uikit';
import {
  logger,
  validation,
  useTranslation,
  getObjectCache,
} from '@the_platform/core';
import {fetchUpdatePassword} from '../../reducer';

type TDispatch = (arg: any) => Promise<Record<string, string>>;

interface IUpdatePwdValues {
  password: string;
  passwordConfirm: string;
}

const initialValues: IUpdatePwdValues = {
  password: '',
  passwordConfirm: '',
};
const notificationActions = getObjectCache('notificationActions') as {
  createToast: (message: {
    message: string,
    type: 'error' | 'warning' | 'info' | 'success',
  }) => void,
};
const MIN_NUMBER_CHARS_IN_PASSWORD = 5;

const onSubmit = (dispatch: TDispatch) => (
  values: IUpdatePwdValues,
  {setSubmitting}: Form.FormikHelpers<IUpdatePwdValues>,
): Promise<unknown> =>
  dispatch(fetchUpdatePassword(values))
    .then(
      (result: Record<string, unknown>): Promise<unknown> => {
        if (result.error) {
          throw result.error;
        }

        return dispatch(
          notificationActions.createToast({
            message: 'Success update password',
            type: 'success',
          }),
        );
      },
    )
    .catch(
      (e: Error): ReturnType<typeof dispatch> => {
        logger.error(E_CODE.E_1, e);

        return dispatch(
          notificationActions.createToast({
            message: e.message,
            type: 'error',
          }),
        );
      },
    )
    .finally((): void => {
      setSubmitting(false);
    });

const SPACING_TOP = 3;
const SPACING_BOTTOM = 2;
const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(SPACING_TOP, 0, SPACING_BOTTOM),
  },
}));

export const UpdatePasswordForm: FC = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const classes = useStyles();

  const validationSchema = validation.object({
    password: validation
      .string()
      .min(
        MIN_NUMBER_CHARS_IN_PASSWORD,
        t('updatePwd.errors.min', {min: MIN_NUMBER_CHARS_IN_PASSWORD}),
      )
      .required(t('updatePwd.errors.required')),
    passwordConfirm: validation
      .string()
      .oneOf(
        [validation.ref('password')],
        t('updatePwd.errors.passwordConfirm'),
      )
      .min(
        MIN_NUMBER_CHARS_IN_PASSWORD,
        t('updatePwd.errors.min', {min: MIN_NUMBER_CHARS_IN_PASSWORD}),
      )
      .required(t('updatePwd.errors.required')),
  });
  const form = Form.useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit(dispatch),
  });

  return (
    <form className={classes.form}>
      <TextField
        name="password"
        helperText={form.touched.password ? form.errors.password : ''}
        error={form.touched.password && Boolean(form.errors.password)}
        label={t('updatePwd.fields.password')}
        type="password"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.password}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        name="passwordConfirm"
        helperText={
          form.touched.passwordConfirm ? form.errors.passwordConfirm : ''
        }
        error={
          form.touched.passwordConfirm && Boolean(form.errors.passwordConfirm)
        }
        label={t('updatePwd.fields.passwordConfirm')}
        type="password"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.passwordConfirm}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        disabled={form.isSubmitting || form.isValidating}
        onClick={() => form.handleSubmit()}>
        {t('updatePwd.buttons.submit')}
      </Button>
    </form>
  );
};

UpdatePasswordForm.displayName = 'UpdatePasswordForm';
