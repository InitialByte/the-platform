import * as React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {connect} from 'react-redux';

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
import {validation} from '@the_platform/core';
import {signIn} from '../provider';
import {login as loginActon} from '../reducer';
import {
  ROUTE_AUTH_LOGIN_CERTIFICATE,
  ROUTE_AUTH_RECOVERY_PASSWORD,
} from '../constants/routes';

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

const validationSchema = validation.object({
  password: validation
    .string()
    .min(
      MIN_NUMBER_CHARS_IN_PASSWORD,
      `Must be ${MIN_NUMBER_CHARS_IN_PASSWORD} characters or more`,
    )
    .required('Required'),
  email: validation
    .string()
    .email('Invalid email address')
    .required('Required'),
});

const onSubmit = (
  navigate: typeof useNavigate,
  login: typeof loginActon,
  navigateAfterSignin: string = '/',
): void => (
  values: ILoginFormValues,
  {
    setSubmitting,
  }: {
    setSubmitting: (value: boolean) => void;
  },
): void => {
  signIn(values)
    .then(() => {
      navigate(navigateAfterSignin);
      login('Eugene');
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

const mapState = (): Record<string, string> => ({});
const mapDispatch = {loginDispatch: loginActon};

export const LoginForm = connect(
  mapState,
  mapDispatch,
)(
  ({loginDispatch}): JSX.Element => {
    const navigate = useNavigate();
    const classes = useStyles();
    const form = Form.useFormik({
      initialValues,
      validationSchema,
      onSubmit: onSubmit(navigate, loginDispatch),
    });

    return (
      <form className={classes.form}>
        <TextField
          name="email"
          helperText={form.touched.email ? form.errors.email : ''}
          error={form.touched.email && Boolean(form.errors.email)}
          label="Email"
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
          label="Password"
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
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={form.isSubmitting || form.isValidating}
          onClick={form.handleSubmit}>
          SignIn
        </Button>

        <Grid container>
          <Grid item xs>
            <Link
              component={UILink}
              to={ROUTE_AUTH_RECOVERY_PASSWORD}
              variant="body2">
              Forgot password?
            </Link>
          </Grid>

          <Grid item>
            <Link
              component={UILink}
              to={ROUTE_AUTH_LOGIN_CERTIFICATE}
              variant="body2">
              Login via certificate
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  },
);

LoginForm.displayName = 'LoginForm';
