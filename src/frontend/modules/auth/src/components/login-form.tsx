import * as React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {
  Button,
  TextField,
  Form,
  Grid,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Link as UILink,
} from '@the_platform/react-uikit';
import {validation, useTranslation} from '@the_platform/core';
import {fetchLogin} from '../reducer';
import {ROUTE_AUTH_RECOVERY_PASSWORD} from '../constants/routes';

/* eslint-disable */
// @ts-nocheck

interface ILoginFormValues {
  email: string;
  password: string;
}

const initialValues: ILoginFormValues = {
  email: '',
  password: '',
};

const MIN_NUMBER_CHARS_IN_PASSWORD = 5;

const onSubmit = (
  navigate: typeof useNavigate,
  dispatch: any,
  navigateAfterSignin: string = '/',
): void => (
  values: ILoginFormValues,
  {
    setSubmitting,
  }: {
    setSubmitting: (value: boolean) => void;
  },
): void => {
  dispatch(fetchLogin(values))
    .then(() => {
      navigate(navigateAfterSignin);
    })
    .catch(console.error)
    .finally(() => {
      setSubmitting(false);
    });
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginForm = connect()(
  (): JSX.Element => {
    const navigate = useNavigate();
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
      email: validation
        .string()
        .email(t('signin.errors.invalidEmail'))
        .required(t('signin.errors.required')),
    });
    const form = Form.useFormik({
      initialValues,
      validationSchema,
      onSubmit: onSubmit(navigate, dispatch),
    });

    return (
      <form className={classes.form}>
        <TextField
          name="email"
          helperText={form.touched.email ? form.errors.email : ''}
          error={form.touched.email && Boolean(form.errors.email)}
          label={t('signin.fields.email')}
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
          name="password"
          helperText={form.touched.password ? form.errors.password : ''}
          error={form.touched.password && Boolean(form.errors.password)}
          label={t('signin.fields.password')}
          type="password"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.password}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <FormControlLabel
          control={<Checkbox color="primary" />}
          label={t('signin.buttons.remember')}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={form.isSubmitting || form.isValidating}
          onClick={form.handleSubmit}>
          {t('signin.buttons.submit')}
        </Button>

        <Grid container>
          <Grid item xs>
            <Link
              component={UILink}
              to={ROUTE_AUTH_RECOVERY_PASSWORD}
              variant="body2">
              {t('signin.buttons.forgot')}
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  },
);

LoginForm.displayName = 'LoginForm';
