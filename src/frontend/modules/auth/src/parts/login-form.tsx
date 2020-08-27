import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Button,
  TextField,
  Form,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@the_platform/react-uikit';
import {validation} from '@the_platform/core';
import {signIn} from '../provider';
import {login as loginActon} from '../reducer';

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

const mapState = (): Record<string, string> => ({});
const mapDispatch = {loginDispatch: loginActon};

export const LoginForm = connect(
  mapState,
  mapDispatch,
)(
  ({loginDispatch}): JSX.Element => {
    const navigate = useNavigate();
    const form = Form.useFormik({
      initialValues,
      validationSchema,
      onSubmit: onSubmit(navigate, loginDispatch),
    });

    return (
      <form>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md sm xs>
            <TextField
              name="email"
              helperText={form.touched.email ? form.errors.email : ''}
              error={form.touched.email && Boolean(form.errors.email)}
              label="Email"
              fullWidth
              autoFocus
              type="email"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md sm xs>
            <TextField
              name="password"
              helperText={form.touched.password ? form.errors.password : ''}
              error={form.touched.password && Boolean(form.errors.password)}
              label="Password"
              fullWidth
              type="password"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.password}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
          </Grid>

          <Grid item>
            <Button
              disableFocusRipple
              disableRipple
              style={{textTransform: 'none'}}
              variant="text"
              color="primary">
              Forgot password ?
            </Button>
          </Grid>

          <Grid item>
            <Button
              disableFocusRipple
              disableRipple
              style={{textTransform: 'none'}}
              variant="text"
              color="primary">
              Login via certificate
            </Button>
          </Grid>
        </Grid>

        <Grid container justify="center" style={{marginTop: '10px'}}>
          <Button
            variant="outlined"
            color="primary"
            disabled={form.isSubmitting || form.isValidating}
            onClick={form.handleSubmit}>
            SignIn
          </Button>
        </Grid>
      </form>
    );
  },
);

LoginForm.displayName = 'LoginForm';
