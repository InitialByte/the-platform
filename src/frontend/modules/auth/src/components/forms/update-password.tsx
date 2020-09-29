/* eslint-disable */
// @ts-nocheck

import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Button, TextField, Form, makeStyles} from '@the_platform/react-uikit';
import {
  logger,
  validation,
  useTranslation,
  getObjectCache,
} from '@the_platform/core';
import {fetchUpdatePassword} from '../../reducer';

interface IUpdatePwdValues {
  password: string;
  passwordRepeat: string;
}

interface ISubmitting {
  setSubmitting: (value: boolean) => void;
}

const initialValues: IUpdatePwdValues = {
  password: '',
  passwordRepeat: '',
};
const notificationActions = getObjectCache('notificationActions');

const onSubmit = (dispatch: any): void => (
  values: IUpdatePwdValues,
  {setSubmitting}: ISubmitting,
): Promise<any> =>
  dispatch(fetchUpdatePassword(values))
    .then((result: any): void => {
      if (result.error) {
        throw result.error;
      }
      dispatch(
        notificationActions.createToast({
          message: 'Success update password',
          type: 'success',
        }),
      );
    })
    .catch((e: Error): void => {
      logger.error(E_CODE.E_1, e);
      dispatch(
        notificationActions.createToast({
          message: e.message,
          type: 'error',
        }),
      );
    })
    .finally((): void => {
      setSubmitting(false);
    });

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const UpdatePasswordForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const classes = useStyles();

  const validationSchema = validation.object({
    password: validation
      .string()
      .min(
        MIN_NUMBER_CHARS_IN_PASSWORD,
        `Must be ${MIN_NUMBER_CHARS_IN_PASSWORD} characters or more`,
      )
      .required(t('signin.errors.required')),
    passwordRepeat: validation
      .string()
      .min(
        MIN_NUMBER_CHARS_IN_PASSWORD,
        `Must be ${MIN_NUMBER_CHARS_IN_PASSWORD} characters or more`,
      )
      .required(t('signin.errors.required')),
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
        label={t('updatepwd.fields.password')}
        type="password"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.password}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        name="password-repeat"
        helperText={
          form.touched.passwordRepeat ? form.errors.passwordRepeat : ''
        }
        error={
          form.touched.passwordRepeat && Boolean(form.errors.passwordRepeat)
        }
        label={t('updatepwd.fields.password_repeat')}
        type="passwordRepeat"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.passwordRepeat}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={form.isSubmitting || form.isValidating}
        onClick={form.handleSubmit}>
        {t('updatepwd.buttons.submit')}
      </Button>
    </form>
  );
};

UpdatePasswordForm.displayName = 'UpdatePasswordForm';
