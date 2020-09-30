import * as React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {
  Button,
  TextField,
  Form,
  Grid,
  makeStyles,
} from '@the_platform/react-uikit';
import {
  logger,
  validation,
  useTranslation,
  getObjectCache,
} from '@the_platform/core';
import {fetchRegister} from '../../reducer';
import {
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_RECOVERY_PASSWORD,
} from '../../constants/routes';

interface IRegisterFormValues {
  email: string;
  password: string;
  fullName: string;
}

const initialValues: IRegisterFormValues = {
  email: '',
  password: '',
  fullName: '',
};

const MIN_NUMBER_CHARS_IN_PASSWORD = 5;
const notificationActions = getObjectCache('notificationActions') as {
  createToast: (message: {
    message: string,
    type: 'error' | 'warning' | 'info' | 'success',
  }) => void,
};

const onSubmit = (dispatch: () => Promise<unknown>) => (
  values: IRegisterFormValues,
  {setSubmitting}: Form.FormikHelpers<IRegisterFormValues>,
): Promise<unknown> =>
  dispatch(fetchRegister(values))
    .then(
      (result: Record<string, unknown>): ReturnType<typeof dispatch> => {
        if (result.error) {
          throw result.error;
        }

        return dispatch(
          notificationActions.createToast({
            message: 'Success Register',
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

export const RegisterForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const classes = useStyles();
  const required = t('register.errors.required');

  const validationSchema = validation.object({
    password: validation
      .string()
      .min(
        MIN_NUMBER_CHARS_IN_PASSWORD,
        t('register.errors.min', {min: MIN_NUMBER_CHARS_IN_PASSWORD}),
      )
      .required(required),
    email: validation
      .string()
      .email(t('register.errors.invalidEmail'))
      .required(required),
    fullName: validation.string().required(required),
  });
  const form = Form.useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit(dispatch),
  });

  return (
    <form className={classes.form}>
      <TextField
        name="email"
        helperText={form.touched.email ? form.errors.email : ''}
        error={form.touched.email && Boolean(form.errors.email)}
        label={t('register.fields.email')}
        autoFocus
        type="email"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.email}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        name="fullName"
        helperText={form.touched.fullName ? form.errors.fullName : ''}
        error={form.touched.fullName && Boolean(form.errors.fullName)}
        label={t('register.fields.fullName')}
        type="input"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.fullName}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        name="password"
        helperText={form.touched.password ? form.errors.password : ''}
        error={form.touched.password && Boolean(form.errors.password)}
        label={t('register.fields.password')}
        type="password"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.password}
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
        {t('register.buttons.submit')}
      </Button>

      <Grid container>
        <Grid item xs>
          <Link to={ROUTE_AUTH_LOGIN} variant="body2">
            {t('register.buttons.signin')}
          </Link>
        </Grid>

        <Grid item>
          <Link to={ROUTE_AUTH_RECOVERY_PASSWORD} variant="body2">
            {t('register.buttons.forgot')}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

RegisterForm.displayName = 'RegisterForm';
